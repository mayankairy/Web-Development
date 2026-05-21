const mongoose=require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL);
// for all collection: create mongoose Schema and model object

// let todos=[];
// let users=[];
// let todoId=0;
// let userId=0;


// Schema helps to define 
const userSchema=new mongoose.Schema({
    username:{type:String},
    password:{type:String}
})

const todoSchema=new mongoose.Schema({
    userId: mongoose.Types.ObjectId,    // because of this we have variable userId in our todos collection, to access it anywhere
    // OR
    // userId:{
    //     type:Number,
    //     required:true
    // },
    title:String,
    description:String
})

//models helps us to connect
const userModel=mongoose.model("users",userSchema);                  // users, collection name in our mongodb
const todoModel=mongoose.model("todos",todoSchema);

module.exports={
    userModel:userModel,
    todoModel:todoModel
}