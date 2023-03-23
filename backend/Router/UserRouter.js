const express = require("express");
const jwt = require("jsonwebtoken");

class UserRouter {
  constructor(UserService) {
    this.UserService = UserService;
  }

  router() {
    let router = express.Router();
    router.use("/", this.auth.bind(this));
    router.put("/changepassword", this.putChangePassword.bind(this));
    router.get("/cartlist/:userName", this.getCartlist.bind(this));
    router.put("/cartlist", this.putCartlist.bind(this));
    router.put("/addnewcartlist", this.putAddNewCart.bind(this));
    router.delete("/delcart/:cartID", this.delCart.bind(this));
    router.post("/buyfromcart", this.postBuyFromCart.bind(this));
    router.get("/orderlist/:userID", this.getOrderList.bind(this));
    return router;
  }

  async auth(req, res, next) {
    try {
      let auth = await this.UserService.auth(req.headers.authorization);
      next();
    } catch (error) {
      console.log(error);
      res.send("error");
    }
  }

  async putChangePassword(req, res) {
    try {
      console.log(req.body.userName);
      console.log(req.body.oldPassword);
      console.log(req.body.newPassword);
      let data = await this.UserService.putChangePassword(
        req.body.userName,
        req.body.oldPassword,
        req.body.newPassword
      );
      console.log(data);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }

  async getCartlist(req, res) {
    // console.log('ok')
    console.log(req.params.userName);
    try {
      let data = await this.UserService.getCartlist(req.params.userName);
      console.log(data);
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  }

  async putCartlist(req, res) {
    console.log(req.body.cartID);
    console.log(req.body.newQty);
    try {
      let data = await this.UserService.putCartlist(
        req.body.cartID,
        req.body.newQty
      );
      res.json({ backend: "updated" });
    } catch (error) {
      console.log(error);
    }
  }

  async putAddNewCart(req, res) {
    // console.log(req.body.itemID)
    try {
      let data = await this.UserService.putAddNewCart(
        req.body.userID,
        req.body.itemID
      );
      // console.log('data',data)
      res.json({ backend: "updated" });
    } catch (error) {}
  }

  async delCart(req, res) {
    console.log("del");
    console.log(req.params.cartID);
    try {
      let data = await this.UserService.delCart(req.params.cartID);
      res.json({ backend: "del" });
    } catch (error) {
      console.log(error);
    }
  }

  async postBuyFromCart(req, res) {
    try {
      console.log("oj");
      console.log(req.body.userID);
      let data = await this.UserService.postBuyFromCart(req.body.userID);
      res.json({ backend: "updated" });
    } catch (error) {
      console.log(error);
    }
  }

  async getOrderList(req, res) {
    // console.log('ok')
    console.log('get')
    console.log(req.params.userID);
    try {
      let data = await this.UserService.getOrderList(req.params.userID);
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserRouter;
