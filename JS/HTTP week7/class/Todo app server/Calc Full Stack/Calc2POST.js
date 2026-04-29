// getting data from body
const express=require('express');
const app=express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', function(req,res){
    console.log("welcome to the landing page");
    res.sendFile("/Users/shrutiairy/Desktop/Mayank/Cloud Computing/VCS/WebDev/JS/HTTP week7/class/Todo app server/Calc Full Stack/Calc2POST.html");

})

app.post('/sum', function(req,res){
    const a=parseInt(req.body.a);
    const b=parseInt(req.body.b);

    const sum=a+b;
    res.json({
        ans:sum
    })
})

app.post('/sub', function(req,res){
    const a=parseInt(req.body.a);
    const b=parseInt(req.body.b);

    const sub=a-b;
    res.json({
        ans:sub
    })
})

app.post('/multiply', function(req,res){
    const a=parseInt(req.body.a);
    const b=parseInt(req.body.b);

    const multiply=a*b;
    res.json({
        ans:multiply
    })
})

app.post('/divide', function(req,res){
    const a=parseInt(req.body.a);
    const b=parseInt(req.body.b);

    const divide=a/b;
    res.json({
        ans:divide
    })
})

app.listen(3003, ()=>console.log("listening on localhost:3003"));