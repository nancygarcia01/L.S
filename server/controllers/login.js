const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {JWT}= require("../../config/config");
const models= require("../../database/models");

const login= async(req, res) => {
    try {
        const {body}= req;
       const findUsers= await models.users.findOne({
           where:{
            username: body.username,
           }
       });
       if(!findUsers)
       return res.status(200).send("no se encontro el usuario");

       if(!bcryptjs.compareSync(body.password, findUsers.password))
         return res.status(404).send("contraseña no coincide");

       delete findUsers.dataValues.password;

    const token= jwt.sign({userId: findUsers.id},
        JWT.SEED,{
            expiresIn:JWT.EXPIRES,
        });
        
     return res.status(200).send({data:findUsers, token:token});
    } catch (error) {
        console.log(error);
        return res.status(500).send("lo sentimos ocurrio un error en el servidor");  
    }
}

module.exports= {login};