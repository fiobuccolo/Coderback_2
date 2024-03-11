import mongoose, { Schema,model } from "mongoose";

const messageSchema = new Schema ({
        user:{
        type: String,
        require:true,
         },
       message:{
        type:String,
        require:true,
        }

})

const messagesModel = model("messages",messageSchema)
export {messagesModel}