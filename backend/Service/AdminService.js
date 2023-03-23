const jwt = require("jsonwebtoken");
require("dotenv").config();

class AdminService {
  constructor(knex) {
    this.knex = knex;
  }

  //auth
  async auth(){
    try{
      let data=await this.knex.select('*').from('marketplace_user');
      console.log(data);
    }
    catch(error){
      console.log(error);
    }
  }
}
module.exports = AdminService;
