const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserService {
  constructor(knex) {
    this.knex = knex;
  }

  async auth(authorization) {
    try {
      let data = await jwt.verify(
        authorization.split(" ")[1],
        process.env.ACCESS_TOKEN_SECRET
      );
      console.log(data.User_Name);
      console.log(data.User_admin);
      let check = await this.knex("*")
        .from("marketplace_user")
        .where("User_Name", "=", data.User_Name)
        .andWhere("User_admin", "=", data.User_admin);
      if (check.length == 1) {
        console.log("auth ok");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async putChangePassword(userName, oldPassword, newPassword) {
    try {
      let data = await this.knex("*")
        .from("marketplace_user")
        .where("User_Name", "=", userName)
        .andWhere("User_Password", "=", oldPassword);
      if (data.length) {
        let data = await this.knex("*")
          .from("marketplace_user")
          .where("User_Name", "=", userName)
          .andWhere("User_Password", "=", oldPassword)
          .update({
            User_Password: newPassword,
          });
        return { backend: "updated" };
      } else {
        return { backend: "Password is wrong!" };
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getCartlist(userName) {
    let data = await this.knex("marketplace_user")
      .join(
        "marketplace_cart",
        "marketplace_user.User_ID",
        "=",
        "marketplace_cart.User_ID"
      )
      .join(
        "marketplace_item",
        "marketplace_cart.Item_ID",
        "=",
        "marketplace_item.Item_ID"
      )
      .select(
        "marketplace_cart.Cart_ID",
        "marketplace_user.User_Name",
        "marketplace_user.User_ID",
        "marketplace_item.Item_Name",
        "marketplace_item.Item_Img_Url",
        "marketplace_cart.Item_Qty",
        "marketplace_item.Item_Price"
      )
      .where("marketplace_user.User_Name", "=", userName)
      .orderBy("marketplace_cart.Cart_ID");
    return data;
  }

  async putCartlist(cartID, newQty) {
    try {
      let data = await this.knex("marketplace_cart")
        .join(
          "marketplace_item",
          "marketplace_cart.Item_ID",
          "=",
          "marketplace_item.Item_ID"
        )
        .select("marketplace_cart.Cart_ID", "marketplace_cart.Item_Qty")
        .where("marketplace_cart.Cart_ID", "=", cartID)
        .update({
          Item_Qty: newQty,
        })
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async putAddNewCart(userID, itemID) {
    try {
      let data = await this.knex("marketplace_user")
        .join(
          "marketplace_cart",
          "marketplace_user.User_ID",
          "=",
          "marketplace_cart.User_ID"
        )
        .join(
          "marketplace_item",
          "marketplace_cart.Item_ID",
          "=",
          "marketplace_item.Item_ID"
        )
        .select(
          "marketplace_cart.Cart_ID",
          "marketplace_user.User_Name",
          "marketplace_user.User_ID",
          "marketplace_item.Item_Name",
          "marketplace_item.Item_ID",
          "marketplace_cart.Item_Qty",
          "marketplace_item.Item_Price"
        )
        .where("marketplace_user.User_ID", "=", userID)
        .andWhere("marketplace_cart.Item_ID", "=", itemID)
        .then((data) => {
          if (data.length > 0) {
            let newQty = (Number(data[0].Item_Qty) + 1).toString();
            return this.knex("marketplace_cart")
              .select("*")
              .where("User_ID", "=", userID)
              .andWhere("Item_ID", "=", itemID)
              .update({
                Item_Qty: newQty,
              })
              .then((data) => {
                console.log(data);
                console.log("updated");
              })
              .catch((error) => {
                console.log(error);
              });
          } else if (data.length == 0) {
            return this.knex("marketplace_cart").insert([
              { User_ID: userID, Item_ID: itemID, Item_Qty: 1 },
            ]);
          }
        });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async delCart(cartID) {
    return this.knex("*")
      .from("marketplace_cart")
      .where("Cart_ID", "=", cartID)
      .del();
  }

  async postBuyFromCart(userID) {
    try {
      // await this.knex.transaction(async (trx) => {
      await this.knex.transaction(async (trx) => {
        let data = await trx("marketplace_cart")
          .join(
            "marketplace_item",
            "marketplace_cart.Item_ID",
            "=",
            "marketplace_item.Item_ID"
          )
          .select(
            "User_ID",
            "marketplace_cart.Item_ID",
            "marketplace_cart.Item_Qty",
            "marketplace_item.Item_Price",
            this.knex.raw(`("Item_Qty"*"Item_Price") as "Totel_Price"`)
          )
          .where("marketplace_cart.User_ID", "=", userID);

        let newOrderNo = await trx
          .queryBuilder()
          .select("Order_No")
          .from("marketplace_order")
          .where("User_ID", "=", userID)
          .orderBy("Order_No", "desc")
          .then((data) => {
            // console.log(data[0].Order_No)
            return data[0].Order_No;
          });
        console.log(data);
        console.log(newOrderNo);

        for (let i = 0; i < data.length; i++) {
          await trx("marketplace_order").insert([
            {
              Order_No: newOrderNo + 1,
              User_ID: data[i].User_ID,
              Item_ID: data[i].Item_ID,
              Item_Qty: data[i].Item_Qty,
              Item_TotalPrice: data[i].Totel_Price,
            },
          ]);
        }

        let nd=await trx('*')
        .from('marketplace_cart')
        .where('User_ID','=',userID)
        .del()
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getOrderList(userID){
    try{
      let data=await this.knex('marketplace_order')
      .join(
        "marketplace_item",
        "marketplace_order.Item_ID",
        "=",
        "marketplace_item.Item_ID"
      )
      .select(
        "marketplace_order.Order_ID",
        "marketplace_order.Order_No",
        "marketplace_item.Item_Img_Url",
        "marketplace_item.Item_Name",
        "marketplace_order.Item_Qty",
        "marketplace_item.Item_Price",
        "marketplace_order.Item_TotalPrice"
      )
      .where('User_ID','=',userID)
      .orderBy("marketplace_order.Order_No","desc")
      .then((data)=>{
        console.log(data)
        return data
      })
      return data
    }catch(error){
      console.log(error)
    }
  }
}
module.exports = UserService;
