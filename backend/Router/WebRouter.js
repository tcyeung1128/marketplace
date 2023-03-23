const express = require("express");
const jwt = require("jsonwebtoken");

class WebRouter {
  constructor(WebService) {
    this.WebService = WebService;
  }

  router() {
    let router = express.Router();
    router.get("/products", this.getProducts.bind(this));
    router.get("/products/:id", this.getProductsDetail.bind(this));
    router.get("/activity", this.getActivity.bind(this));
    router.get("/activity/:id", this.getActivityDetail.bind(this));
    router.post("/login", this.postLogin.bind(this));
    return router;
  }

  async getProducts(req, res) {
    let data = await this.WebService.getProducts();
    res.json(data);
  }

  async getProductsDetail(req, res) {
    let itemId = req.params.id;
    let data = await this.WebService.getProductsDetail(itemId);
    res.json(data);
  }

  async getActivity(req, res) {
    let data = await this.WebService.getActivity();
    res.json(data);
  }

  async getActivityDetail(req, res) {
    let activityId = req.params.id;
    let data = await this.WebService.getActivityDetail(activityId);
    res.json(data);
  }

  async postLogin(req, res) {
    let account = req.body.user;
    let paasword = req.body.password;
    console.log("account", account);
    console.log("paasword", paasword);
    
    let response = await this.WebService.postLogin(account, paasword);
    res.json(response);
    // console.log(jwt.verify(token, process.env.ACCESS_TOKEN_SECRET));
  }
}

module.exports = WebRouter;
