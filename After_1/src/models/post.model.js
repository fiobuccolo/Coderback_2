import  { Schema,model} from "mongoose"

const postSchema = new Schema({ 
    id: {type:Number, required:true, unique:true},
    title:{type:String, required:true},
    body:{type:String, required:true},
    author: {type:Schema.Types.ObjectId, ref: "User", required:true},
    })

const postModel = model("posts",postSchema)

export {postModel}

