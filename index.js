const{PORT}=require("./config/config");

const {db} =require("./config/database");

const {server}= require("./server/index");


db.authenticate().then(()=>{
    console.log("database connected")
    server.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`)
    })
  
  });