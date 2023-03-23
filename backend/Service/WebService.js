const jwt = require("jsonwebtoken");
require("dotenv").config();

class WebService {
  constructor(knex) {
    this.knex = knex;
  }

  async getProducts() {
    try {
      let data = await this.knex("*").from("marketplace_item");
      // console.log(data)
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsDetail(itemId) {
    try {
      let data = await this.knex("*")
        .from("marketplace_item")
        .where("Item_ID", "=", itemId);
      // console.log(data)
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getActivity() {
    try {
      let data = await this.knex("*").from("marketplace_activity");
      // console.log(data)
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getActivityDetail(activityId) {
    try {
      let data = await this.knex("*")
        .from("marketplace_activity")
        .where("Activity_ID", "=", activityId);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async postLogin(user, password) {
    try {
      let data = await this.knex
        .select("User_Name", "User_Password", "User_admin", "User_ID")
        .from("marketplace_user")
        .where("User_Name", "=", user)
        .andWhere("User_Password", "=", password);
      if (data.length > 0) {
        let payload = {
          User_Name: data[0].User_Name,
          User_admin: data[0].User_admin,
        };
        console.log(payload);
        console.log(process.env.ACCESS_TOKEN_SECRET);
        let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
        let response = {
          token: "Bearer " + token,
          User_Name: data[0].User_Name,
          User_admin: data[0].User_admin,
          User_ID: data[0].User_ID,
        };
        return response;
      } else {
        return { login: "false" };
      }
    } catch (error) {
      console.log(error);
    }
  }

}
module.exports = WebService;
