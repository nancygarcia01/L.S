
const res =require("express/lib/response");

const {router} = require("./router/index"); 

const express =require("express");

const server = express();

server.use(express.json()); 

server.use(router);

server.use(`/public`, express.static(__dirname + "/public"));


//server.get((`/saludar`), (req, res)=>{
  //return res.status(200).send("hola soy emma");
//})

module.exports={server};