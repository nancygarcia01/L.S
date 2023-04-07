const models = require("../../database/models");

const addcommentstoplace = async(req, res) =>{
    try {
        const {body, userId}= req;

        const existplace = await models.places.findOne({
            where:{
                id:body.placeId,
                statusDelete: false,
            },
        });

        if (!existplace) return res.status(404).send("el lugar no existe");

        const comment= await models.comments.create({
            placeId:body.placeId,
            userId,
            comment: body.comment,
           
        });
        return res.status(201).send(comment);
    } catch (error) {
        return res.status(500).send("error interno del servicio");
    }
};

const getcommentsByplace = async(req, res) => {
try {
    const {placeId} = req.params;
    const comment = await models.comments.findAll({
        where:{
            placeId:placeId,
            statusDelete: false,
        },
    });
    return res.status(200).send(comment);
} catch (error) {
   return res.status(500).send("error en el servidor")
}
};

const deleteComment = async (req, res) => {
    try {
        const {commentId} = req.params;
        const comment = await models.comments.findOne({
            where:{
                id:commentId,
            },
        });
        if(!comment) return (404).send("el comentario no existe");
        await comment.update({
            statusDelete:true,
        });

        return res.status(200).send("el comentario se ha eliminado");
        } catch (error) {
            console.log(error)
        return res.status(500).send("error del servicio interno");
    }
};

module.exports={addcommentstoplace, getcommentsByplace,  deleteComment};