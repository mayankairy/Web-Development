const jwt = require("jsonwebtoken");
function authMiddleware(req,res,next){
     const token=req.headers.token;
        if(!token){
            res.status(403).send({
                message:"wrong info"
            })
            return;
        }
    
        const decoded=jwt.verify(token,"mayank123");
        const username=decoded.username;
    
        if(!username){
            res.status(403).send({
                message:"malformed token"
            })
            return;
        }

        req.username=username;

        next();
}

module.exports ={
    authMiddleware
}