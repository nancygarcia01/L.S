const models = require("../../database/models");
const address = require("../../database/models/addresses");
const place = require("../../database/models/places");
const {fileUpload} = require("../utils/uploadFiles");


const addPlace = async(req, res) => {

try {
   const {body, userId} = req;

   let image = fileUpload(body.image, ("/public"))
  console.log(image);
  image = `http://localhost:4040/${image}`;

   const address = await models.address.create({
    state:body.state,
    city:body.city,
    suburd:body.suburd,
    street:body.street,
    postalcode:body.postalcode,
   });
   
   const place = await models.places.create({
    name:body.name,
    description:body.description,
    addressId: address.id,
    image,
    userId:userId,
   
   });

   return res.status(201).send(place);
} catch (error) {
    console.log(error)
    return res.status(500).send("lo siento ha ocurrido un error en el servidor");
}

};

const getplace = async(req, res)=>{
try {
    const place = await models.places.findAll({
        attributes:{exclude:["updatedAt"]},
        where:{
            name:"restaurate el chavo"
        },

     include:[
        {
          model:models.address,
          attributes:{exclude:["createdAt", "updatedAt"]},
        },
        {
        model: models.likes,
        attributes:["id", "isLike", "userId"],
        }
     ]
    });
    return res.status(200).send(place);
} catch (error) {
    console.log(error)
    return res.status(500)
    .send("lo sentimos ocurrio un problema en el servidor");
}

};
const updateplace = async(req, res)=> {
    try {
        //actualizar un lugar
        const {placeId} = req.params; //buscar el id id de places
        const {body}= req;
        const place = await models.places.findOne({
            where:{
                id: placeId,
            },
        });
        if (!place) return res.status(404).send("el lugar no se encuentra");
        //se actualizan ahora los datos de lugar.
const address= await models.address.findOne({
    where:{
        id:place.addressId,
    }
});
          await place.update({
            name: body.name,
            description: body.description
          });

          if (address)
          await address.update({
            state:body.state,
            city:body.city,
            suburd:body.suburd,
            street:body.street,
            postalcode:body.postalcode,
          });

        return res.status(200).send(place);
    } catch (error) {
        console.log(error)
        return res.status(500).send("lo sentimos ocurrio un error en el servidor");
    }
};

const deleteplace = async(req, res) => {
    try {
        const {placeId} =req.params;
        const place=await models.places.findOne({
            where:{
                id: placeId,
                statusDelete:false,
            },
        });
        if (!place) res.status(404).send("el lugar no se encuentra"); 

        await place.update({
            statusDelete: true,
        });
        return res.status(200).send("se ha elimido este lugar");
    } catch (error) {
       console.log(error);
       return res.status(500).send("ha ocurrido un error en el servidor"); 
    }
};
   

module.exports={addPlace, getplace, updateplace, deleteplace};