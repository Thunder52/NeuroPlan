import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerController=async (req,res)=>{
    const {name,email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new User({name,email,password:hashedPassword});
        await newUser.save();
        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        return res.status(201).json({message:"User registered successfully",token,newUser});
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }
}

export const loginController=async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        return res.status(200).json({message:"User logged in securely",token,user});
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }
}