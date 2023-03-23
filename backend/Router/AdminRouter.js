const express = require("express");
const jwt = require("jsonwebtoken");

class AdminRouter{
  constructor(AdminService){
    this.AdminService=AdminService;
  }

  router(){
    let router=express.Router();
    router.post('/')
  }
}

module.exports=AdminRouter;