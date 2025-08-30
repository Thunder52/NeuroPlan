import mongoose from "mongoose";

const SheduleSchema=new mongoose.Schema({
    task:String,
    time:String
});

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    Schedule:[SheduleSchema]
})

const User=mongoose.model('User',userSchema);
export default User;