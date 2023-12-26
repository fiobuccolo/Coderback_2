import { userModel } from "../../models/user.model.js"

class UsersDao{
    async findUsers(){
        return await userModel.find()
    }

    async findUserById(id){
        return await userModel.findById(id)
    }
    

    async createUser(user){
        return await userModel.create(user)
    }

    async updateUser (_id,user){
        return await userModel.findOneAndUpdate({_id},user)
    }

    async deleteUser(_id){
        // para eliminar tmb los post del usuario que elimino:
            // await postModel.deleteMany({author:_id})
        return await userModel.findByIdAndDelete({_id})
    }
}

export default new UsersDao()