const express=require('express');
const jwt=require('jsonwebtoken');
const {authMiddleware} = require('./middleware');

const app=express();

app.use(express.json());
let userId=1;
let todoId=1;

let users=[{
    useId:1,
    username:"marps",
    password:"123123"
}];
let todos=[{
    userId:1,
    todoId:1,
    todo:"go to gym"
}, {
    userId:1,
    todoId:2,
    todo:"complete the assignment"
}];

app.get('/', (req,res)=>{
    res.sendFile("/Users/shrutiairy/Desktop/Mayank/Cloud Computing/VCS/WebDev/JS/TodosApp/index.html");
})

app.get('/signup', (req,res)=>{
    res.sendFile("/Users/shrutiairy/Desktop/Mayank/Cloud Computing/VCS/WebDev/JS/TodosApp/signup.html");
})

app.get('/signin', (req,res)=>{
    res.sendFile("/Users/shrutiairy/Desktop/Mayank/Cloud Computing/VCS/WebDev/JS/TodosApp/signin.html");
})

app.post('/signup',(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    const userExists=users.find(u=> u.username===username);
    if(userExists){
        res.status(403).json({
            message:"user already exists"
        })
        return;
    }

    users.push({
        userId :userId++,
        username:username,
        password:password
    })

    res.json({
        message:"user created"
    })
})

app.post('/signin',(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    const userExists=users.find(u=> u.username===username && u.password===password);
    if(!userExists){
        res.status(403).json({
            message:"user doesn't exists"
        })
       // window.location='/signup';
        return;
    }
    
    const token=jwt.sign({userId}, "todo@123");
    res.json({
        token:token
    })

})

//Authorized endpoints
app.get('/todos',authMiddleware, (req,res)=>{
    userId=req.userId;

    const userTodos = todos.filter(t => t.userId === req.userId);
    res.json({
        // todoId: userId.todoId,
        // todo: userId.todo
        userTodos                          //sends whole array
    })
    //send their todoid too, we need them to for deletion
}) 

app.post('/todos', authMiddleware, (req,res)=>{
    userId=req.userId;          

    
    const todo=req.body.todo;
    todos.push({
        userId:userId,
        todoId:todoId++,
        todo:todo
    })

    res.json({
        message:"todo created",
        todoId:todoId-1,
        todo:todo
    })
})

app.delete('/todos', (req,res)=>{
    const authHeader=req.headers.authorization;
        if(!authHeader){
            res.status(403).json({
                messsage:"corrupted HeaderNo token provided"
            })
        }
    
        const token=authHeader.split(" ")[1];
        const decoded=jwt.verify(token,"todo@123");
        const userId=decoded.userId;
    
    req.userId=userId;       
    const todelete=parseInt(req.body.todo);     //because input is number

    const initialLength=todos.length;
    todos=todos.filter(todo=>todo.todoId !==todelete && todo.userId===userId)  // update todos to todos without todelete todo

    if(initialLength>todos.length){
        res.status(200).json({
            message:"todo deleted"
        })
    }
    else{
        res.status(403).json({
            message:"todo not found"
        })
    }

})

app.put('/todos',authMiddleware, (req,res)=>{
    userId=req.userId;
    const upId=parseInt(req.body.todoId);
    const upTodo=req.body.todo;

    const findTodo=todos.find(f=>f.todoId===upId);
    if(!findTodo){
        return;
    }
    else{
        findTodo.todo=upTodo;
    }

    res.json({
        message:"updated",
        todoId:upId,
        todo:upTodo
    })
})

app.listen(3000,()=> console.log("running on 3000"));