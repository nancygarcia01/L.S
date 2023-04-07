const bcryptjs= require("bcryptjs");

const models = require("../../database/models");

const registry = async (req, res) =>{
try {
    const {body}= req;
    encpassword= bcryptjs.hashSync(body.password, 10);
    const addUsers= await models.users.create({
        username:body.username,
        password: encpassword,
    });
    delete addUsers.dataValues.password;
    return res.status(201).send(addUsers);

} catch (error) {
    return res.status(500)
    .send("lo sentimos ocurrio un problema en el servidor"); 
}
}
module.exports={registry};