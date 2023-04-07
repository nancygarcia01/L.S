const models=require("../../database/models");

const addlikeDislike= async(req, res) =>{
    try {
        const {body, userId}=req;

        const existplace = await models.places.findOne({
            where:{
                id:body.placeId,
                statusDelete: false,
            },
        });

        const addlikeDislike= await models.likes.create({
            isLike: body.isLike,
            placeId: body.placeId,
            userId,
        });
       
        return res.status(201).send(addlikeDislike);
        } catch (error) {
            console.log(error)
        return res.status(500).send("error en el servicio")
    }
};

module.exports={addlikeDislike};