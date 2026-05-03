const jwt=require('jsonwebtoken');
function authMiddleware(req,res,next){
    const token=req.headers.token;
    if(!token){
        res.status(403).json({
            message:"corrupted token"
        })
        return;
    }

    const decoded=jwt.verify(token,"todo@123");
    const userId=decoded.userId;

    req.userId=userId;
    next();
}



module.exports={
    authMiddleware:authMiddleware
}