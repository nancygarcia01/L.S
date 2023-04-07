const jwt =require("jsonwebtoken");

const {JWT} =require("../../config/config");

const verifyToken = async (req, res, next)=>{
    try {
        const token = req.get("X-AUTH-TOKEN")

        const decoded = jwt.verify(token, JWT.SEED);
        req.userId=decoded.userId;

        next();
    } catch (error) {
        
        return res.status(401).send(error.message);
    }
};
module.exports={verifyToken};
