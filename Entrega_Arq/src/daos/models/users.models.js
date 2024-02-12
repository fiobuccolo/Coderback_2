import mongoose, {Schema, model } from "mongoose";

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
    loggedBy: String,
    cart: {
        type: mongoose.Schema.Types.ObjectId, ref: "carts"
         }
      
})

userSchema.pre("find", function () {
    // console.log(this);
    this.populate("carts");
  });

const userModel = model("User", userSchema)

export {userModel}



