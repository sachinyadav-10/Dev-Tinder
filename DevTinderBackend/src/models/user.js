const mongoose = require('mongoose');
const validators = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required:true,
    },
    lastName: {
        type: String,
    },
    emailId :{
        type:String,
        lowercase:true,
        required:true,
        index:true,
        unique:true,
        trim:true,
        vaidator(value){
            if(!validators.isEmail(value)){
                throw new Error("emial id is not valid");
            }
        },
    },
    password:{
        type: String,
        required:true,
        vaidator(value){
            if(!validators.isStrongPassword(value)){
                throw new Error("Passward is week");
            }
        },
    },
    age:{
        type:Number,
    },
    gender:{
        type: String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("enter a valid gender")
            }
        },
        
    },
    photoUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm-TruksPXPI5imDL_kfzEfFiAZwg5AzHtWg&s",
        vaidator(value){
            if(!validators.isURL(value)){
                throw new Error("Photo url is not valid");
            }
        },
    },
    about:{
        type: String,
        default: "hii!! , I am intrested to learn new things"
    },
    skills:{
        type:[String],
    },

},{timestamp:true});

UserSchema.methods.getJWT = async function(){
    const user = this;
    const token =jwt.sign({_id:user._id},"king@Tinder123",{expiresIn:"7d"})
    return token;
}

UserSchema.methods.validatePassword = async function(passwordByUserInput){
    const user = this;
    const hashpassward=user.password;
    const isPasswordValid= await bcrypt.compare(passwordByUserInput, hashpassward);
    return isPasswordValid;
}

const User = mongoose.model("user",UserSchema);
module.exports = User;