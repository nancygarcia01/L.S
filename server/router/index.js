const {addPlace, getplace, updateplace, deleteplace}= require("../controllers/places");
const { addcommentstoplace, getcommentsByplace, deleteComment } = require("../controllers/comments");
const { addlikeDislike } = require("../controllers/likes");
const { registry } = require("../controllers/users");
const { login } = require("../controllers/login");
const {verifyToken}= require("../middlewares/auth");

const {Router} = require("express");
const router= Router();
router.route("/places").post(verifyToken, addPlace).get(getplace);

router.put("/places/:placeId",updateplace);

router.delete("/places/:placeId", deleteplace);

router.post("/comment", verifyToken, addcommentstoplace );

router.get("/comment/:placeId",getcommentsByplace);

router.delete("/comment/:commentId", deleteComment);

router.post("/likes", verifyToken, addlikeDislike);

router.post("/registry", registry);

router.post("/login", login);
module.exports={router};