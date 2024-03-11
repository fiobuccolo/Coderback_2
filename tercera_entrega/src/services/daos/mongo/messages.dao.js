import { messagesModel } from "../models/messages.model.js"

class MessagesDao{
    //get all
    async getAllMessages(){
        return await messagesModel.find()
    }

    //get one
    async getOneMessage(id){
        return await messagesModel.findById(id)
    }

    //Create one empty cart
    async CreateOneMessage(message){
        return await messagesModel.create(message)
    }

    //Update one cart
    async UpdateOneMessage(id,message){
        return await messagesModel.findByIdAndUpdate(id,message)
    }

    //Delete one
    async DeleteOneMessage(id){
        return await messagesModel.findByIdAndDelete(id)
    }
}


export default new MessagesDao()