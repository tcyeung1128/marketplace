const express = require('express')
const app = express()
const port = 8000
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());
const knexConfig = require("./database/knexfile").development;
const knex = require("knex")(knexConfig);

require("dotenv").config();

const WebService=require("./Service/WebService");
const WebRouter=require("./Router/WebRouter");
const webService=new WebService(knex);
const webRouter=new WebRouter(webService);

const AdminService=require("./Service/AdminService");
const AdminRouter=require("./Router/AdminRouter");
const adminService=new AdminService(knex);
const adminRouter=new AdminRouter(adminService);

const UserService=require("./Service/UserService");
const UserRouter=require("./Router/UserRouter");
const userService=new UserService(knex);
const userRouter=new UserRouter(userService);

app.use('/information',webRouter.router());
app.use('/member',userRouter.router());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})