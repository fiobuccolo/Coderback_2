import mongoose, { Schema,model } from "mongoose";

const cartSchema = new Schema ({
    products: [{
        product:{
        type: mongoose.Schema.Types.ObjectId, ref: "products"
         },
        quantity:{
        type:Number,
        }
    }]
})

cartSchema.pre("find", function () {
    // console.log(this);
    this.populate("product");
  });

const cartModel = model("carts",cartSchema)
export {cartModel}



