const express=require('express');
const {authMiddleware}=require('./middleware');
const {todoModel, userModel}=require('./models');
const jwt=require('jsonwebtoken');
const app=express();
app.use(express.json());
// let todos=[];
// let users=[];
// let todoId=0;
// let userId=0;


app.post('/signup',async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    // userId +=1;
    // const newUId=userId;

    // const userExists=users.find(x=>x.username===username);
    //async operation
    const userExists=await userModel.findOne({
        username:username,
        password:password
    });
    if(userExists){
        return res.status(403).json({
            message:"user with this username already exists"
        })
    }
    // users.push({username, password,
    //     userId:newUId
    // })
    const newUser=await userModel.create({
        username:username,
        password:password
    })
    // res.json({
    //     userId:newUId,
    //     message:"user created with an id"
    // })
    res.json({
        userId: newUser._id
    })
    
})

app.post('/signin',async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    //const userExists=users.find(x=>x.username===username && x.password===password);
    const userExists=await userModel.findOne({
        username:username,
        password:password
    })
    if(!userExists){
        res.status(403).json({
            message:"incorrect credentials"
        });
        return;
    }else{
        const token=jwt.sign({userId:userExists.userId}, "secret123123");
        //const token=jwt.sign({userId:newUId}, "secret123123");
        res.json({token});
    }
})

app.post('/todo',authMiddleware,async (req,res)=>{
    //const userId=req.userId;
    const userId=req.user._id;
    const title=req.body.title;
    const description=req.body.description;
    // todoId+=1;
    // const newTId=todoId;

    // todos.push({
    //     userId,
    //     todoId: newTId ,
    //     title,
    //     description
    // })

    const newTodo=await todoModel.create({
        userId:userId,
        title:title,
        description:description
    })
    res.json({
        todoId: newTodo._id,
        message:"todo created"
    })

})

app.delete('/todo/:todoId',authMiddleware,(req,res)=>{
    const userId=req.userId;
    const todoId=parseInt(req.params.todoId);
   // we are getting string from params

    // todos=todos.filter(f=>!(f.userId===userId && f.id===todoId));   // because we sent todoId as a variable id to frontend through json

    // to handle errors
    // const todoExists=todos.find(x=>x.userId===userId && x.todoId===todoId);
    // if(!todoExists){
    //     res.status(403).json({
    //         message:"not your todo"
    //     })
    //     return;
    // }else{
    //     todos=todos.filter(f=>!(f.userId===userId && f.todoId===todoId));
    //     // userId comes from token
    // }
    const todoExists=todoModel.findOne({
        userId:userId,
        todoId:todoId
    })

    res.json({
        message:"todo deleted"
    })
})


app.get('/todo',authMiddleware,(req,res)=>{
    // all id's should be number because they come as a string!!
    const userId=req.userId;
    //const userTodos=todos.filter(u=>u.userId===userId);
    const userTodos=todoModel.
    res.json({
        todos:userTodos
    })
})

app.listen(6000,()=>console.log("app live on port 6000"));