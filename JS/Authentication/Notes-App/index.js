const express=require('express');
const app=express();

app.use(express.json());
let notes=[];        // not a way to store data, use mangoDb-databases

app.get('/', function(req,res){
    res.sendFile("/Users/shrutiairy/Desktop/Mayank/Cloud Computing/VCS/WebDev/JS/Authentication/Notes-App/index.html");
})


app.get('/notes', function(req,res){
    res.json({
        notes
    })
})

app.post('/notes', function(req,res){
    const note=req.body.note;
    notes.push(note);

    res.json({
        message: "done"
    })
})

app.delete('/notes', function(req,res){
    const count=parseInt(req.body.count);
    res.status(204).send();
})

app.listen(3004,()=> console.log("running on port 3004"));