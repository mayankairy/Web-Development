// using query params and path params
const express=require('express');
const app=express();

//app.use(express.json());   // this needed when we are getting data from body

app.get('/', function(req,res){
   // res.send("<html> <b> hi welcome to the calculator, made on express </b> </html>");
    // when comes to landing page, send them the html file
   // res.sendFile(path.join(__dirname, "./calc.html"));  // need to give abs path of file
   res.sendFile("/Users/shrutiairy/Desktop/Mayank/Cloud Computing/VCS/WebDev/JS/HTTP week7/class/Todo app server/Calc Full Stack/calc.html");
})

// app.get('/add', function(req,res){
//     const a=parseInt(req.query.a);   //string
//     const b=parseInt(req.query.b);

//     const sum=a+b;

//     //res.send(sum.toString());
//     res.json({
//         ans: sum                // we can only send one res to one req
//     })
// })
app.get('/add/:a/:b', function(req,res){
    const a=parseInt(req.params.a);
    const b=parseInt(req.params.b);

    const add=a+b;

    res.json({
        ans: add
    })
})

// app.get('/sub', function(req,res){
//     const a=parseInt(req.query.a);
//     const b=parseInt(req.query.b);

//     const sub=a-b;
//     res.json({
//         ans:sub
//     })
// })
app.get('/sub/:a/:b', function(req,res){
    const a=parseInt(req.params.a);
    const b=parseInt(req.params.b);

    const sub=a-b;

    res.json({
        ans:sub
    })
})

// app.get('/multiply', function(req,res){
//     const a=parseInt(req.query.a);
//     const b=parseInt(req.query.b);

//     const multiply=a*b;
//     res.json({
//         ans:multiply
//     })
// })
app.get('/multiply/:a/:b', function(req,res){
    const a=parseInt(req.params.a);
    const b=parseInt(req.params.b);

    const multiply=a*b;

    res.json({
        ans:multiply
    })
})

// app.get('/divide', function(req,res){
//     const a=parseInt(req.query.a);
//     const b=parseInt(req.query.b);

//     const divide=a/b;
//     res.json({
//         ans:divide
//     })
// })
app.get('/divide/:a/:b',function(req,res){
    const a=parseInt(req.params.a);
    const b=parseInt(req.params.b);

    const divide=a/b;

    res.json({
        ans:divide
    })
})

app.listen(3002, ()=> console.log("you are running on localhost"));