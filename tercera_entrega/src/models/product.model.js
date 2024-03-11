import { Schema,model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"


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
        type: String,
        enum: ["libros", "cuadernos", "lapiceras","fibras"],
    },
})
productSchema.plugin(mongoosePaginate)

const productModel = model("products",productSchema)
export {productModel}