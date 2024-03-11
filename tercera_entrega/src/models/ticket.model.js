import mongoose, { Schema,model } from "mongoose";

const ticketSchema = new Schema ({
    code:{
        type:String,
        require: true,
        unique:true
    },
    amount:{
        type: Number,
        require: true
    },
    purchaser: {
        type: mongoose.Schema.Types.ObjectId, ref: "users"
    }
})

cartSchema.pre("find", function () {
    // console.log(this);
    this.populate("users");
  });

const ticketModel = model("tickets",ticketSchema)
export {ticketModel}