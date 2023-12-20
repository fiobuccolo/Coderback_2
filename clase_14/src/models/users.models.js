import {Schema, model } from "mongoose";

const userSchema =  new Schema({
    first_name: String,
    last_name: String,
    email:{
        type:String,
        unique:true,
        require:true
    },
    course:{
        type: String,
        enum: ["Frontend","Backend","Javascript"]
    },
})

const userModel = model("User", userSchema)

export {userModel}