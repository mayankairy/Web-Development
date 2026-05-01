const express=require('express');
const jwt = require("jsonwebtoken");
const {authMiddleware}=require("./middleware")
const app=express();

app.use(express.json());
let users=[];
let notes=[];

app.get('/', function(req,res){
    res.sendFile("/Users/shrutiairy/Desktop/Mayank/Cloud Computing/VCS/WebDev/JS/Authentication/notes-auth/index.html")
})

app.post('/signup', function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    const userExists=users.find(user => user.username===username);
    if(userExists){
        res.status(403).send("username already exists!")
        return;
    }

    users.push({
        username:username,
        password:password
    })

    res.json({
        message:"you signed up"
    })
})

app.post('/signin', function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    const userExists=users.find(user => user.username===username && user.password===password);
    if(!userExists){
        res.status(403).json({
            message:"incorrect credentials"
        })
        return;
    }

    const token=jwt.sign({username:username}, "mayank123") // in every get request, user will send this token to backend
    res.json({
        token:token
    })
})

// its a authorised endpoint, it gets our data
app.get('/notes', authMiddleware, function(req,res){
    // first check if they have send a right header(token) and extract what username is from header -- in middleware
    const username=req.username;

    // get notes of that username
    const userNote=notes.filter(note=> note.username===username)
    res.json({
        notes: userNote
    })

})

// its a authorised endpoint, it deals with our data
app.post('/notes',authMiddleware, function(req,res){
    const username=req.username;

    const note=req.body.note;
    notes.push({note, username});
    res.json({
        message: "note created"
    })
})

// its a authorised endpoint, it deals with our data
app.delete('/notes', function(req,res){

})



app.get('/signup', function(req,res){
    res.sendFile("/Users/shrutiairy/Desktop/Mayank/Cloud Computing/VCS/WebDev/JS/Authentication/notes-auth/signup.html")
})

app.get('/signin', function(req,res){
    res.sendFile("/Users/shrutiairy/Desktop/Mayank/Cloud Computing/VCS/WebDev/JS/Authentication/notes-auth/signin.html")
})

app.listen(3005, ()=> console.log("listening on port 3005"));