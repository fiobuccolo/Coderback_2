import { Schema,model } from "mongoose";



const productSchema = new Schema ({
    title:{
        type:String,
        require: true
    },
    description:{
        type:String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    thumbnail:{
        type:String,
        require: false
    },
    code:{
        type:String,
        require: true,
        unique:true
    },
    stock:{
        type:Number,
        require: true
    },
    status:{
        type: Boolean,
        require: true,
        default:true
    },
    category:{
        type:String,
        require: true
    },
})

const productModel = model("products",productSchema)
export {productModel}