const jwt=require("jsonwebtoken");

function authMiddleware(req,res,next){
    const token=req.headers.token;
    // const decoded=jwt.verify(token, "secret123123");
    const decoded=jwt.verify(token, process.env.JWT_SECRET);
    if(decoded.userId){
        req.userId=decoded.userId;
        // not req.newUser._id - because we have that inside userId in our res.json in signup point
        // newUser._id- is how to access it from the mongoDb. like newUser, inside that _id(object that) connect by .(dot)
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