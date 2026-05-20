const jwt=require("jsonwebtoken");

function authMiddleware(req,res,next){
    const token=req.headers.token;
    const decoded=jwt.verify(token, "secret123123");
    if(decoded.user._id){
        //req.userId=parseInt(decoded.userId);
        req.userId=decoded.user._id;
        next();
    }
    else{
        res.status(403).json({
            message:"invalid token"
        })
    }

}

module.exports={
    authMiddleware:authMiddleware
}