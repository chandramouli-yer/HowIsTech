const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    createdAt:{type:Date,required:true},
    updatedAt:{type:Date,required:true}
});

module.exports=mongoose.model('User',userSchema);