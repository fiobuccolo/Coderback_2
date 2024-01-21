import {Schema, model } from "mongoose";

const userSchema =  new Schema({
    first_name: String,
    last_name: String,
    email:{
        type:String,
        unique:true,
        require:true
    },
    age: Number,
    password:String,
    role: {
        type:String,
        default:"user",
        enum: ["user", "admin"],
    },

      
})

const userModel = model("User", userSchema)

export {userModel}