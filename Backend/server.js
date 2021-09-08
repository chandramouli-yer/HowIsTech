require('dotenv').config();
const express = require('express');
const PORT=process.env.PORT||9000;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors=require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const checkToken=require('./authenticate');

const User=require('./models/user');
const app=express();
app.use(cors())
app.use(express.json());

mongoose.connect(process.env.MONGODBURL,{ 
    useUnifiedTopology: true,
    useNewUrlParser: true 
 }).then(res=>{
     console.log("successfully connected to MongoDB Database")
 }).catch(err=>console.log("Theres's some error while connecting to Database",err))






app.post('/login',(req,res)=>{
    console.log("Inside login",req.body)
    User.find({email:req.body.email}).then(user=>{
        if(user.length===0){
            res.status(401).json({
                message:"Auth Failed"
            })
        }
        else{
            bcrypt.compare(req.body.password, user[0].password, function(err, result) {
                if(!result){
                    res.status(401).json({
                        message:"Auth Failed"
                    })
                }
                else{
                    const token=jwt.sign({
                        email:user[0].email,
                        user_id:user[0]._id
                    },"Secret key",
                    {
                        expiresIn:"1h"
                    })
                    res.status(200).json({
                        message:"Login success",
                        token:token
                    })
                }
            });
        }
    })
});



app.get('/getAllUsers',checkToken,(req,res)=>{
    User.find().exec().then(result=>{
     //   console.log(res);
        res.status(200).json({
            message:"All user data",
            data:result
        })
    })
    .catch(err=>{
        console.log(err);
    })
 
});


app.post('/register',(req,res)=>{
    console.log("check mail",req.body);
    console.log("Check password",req.body);
    User.find({email:req.body.email}).exec().then(user=>{
        if(user.length!=0){
            return res.status(409).json({
                message:"OOPS!,This mail is already registered with us"
            })
        }
        else{
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    const user=new User({
                        _id:new mongoose.Types.ObjectId(),
                        firstName:req.body.firstName,
                        lastName:req.body.lastName,
                        email:req.body.email,
                        password:hash,
                        createdAt:new Date(),
                        updatedAt:new Date()
                });
                user.save().then(res=>{
                    console.log("After storing data",res);
                })
                .catch(err=>{
                    console.log(err);
                })
                res.status(201).json({
                    message:"User created",
                    data:user
                })
            });
           
            
            });
        }
    })
 
    
});


app.post("/forgotPassword",(req,res)=>{
    console.log(req.body.forgotEmail);
    User.find({email:req.body.forgotEmail}).exec().then(user=>{
        console.log("Inside user",user)
        if(user.length!=0){
            return res.status(201).json({
                message:"Email Id is registered with us"
            })
        }
        else{  
            return res.status(409).json({
                message:"Email Id is not registered.Consider registering"
            })

        }
    });
})



app.listen(PORT,()=>{
    console.log("Sever started ");
})
