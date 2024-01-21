import { cartModel } from "../models/cart.model.js"

class CartDao{
    //get all
    async getAllCarts(){
        return await cartModel.find()
    }

    //get one
    async getOneCart(id){
        return await cartModel.findById(id)
    }

    //Create one empty cart
    async CreateOneCart(){
        return await cartModel.create()
    }

    //Update one cart
    async UpdateOneCart(cid,pid,quantity){
        try {
            const response = await cartModel.findByIdAndUpdate(
                { _id: cid },
                { $inc: { 'products.$[elem].quantity': quantity } },
                { arrayFilters: [{ 'elem._id': pid }] }
                )      
            console.log(response);
            if(response){
                    return (`data: ${product}`)
                } else{throw new Error("Hubo un error")}
        } catch (error) {
            console.log(`catch en el Dao UpdateOneCart : ${error}`)  
        }
    }
   


    //Delete one
    async DeleteOneCart(id){
        return await cartModel.findByIdAndDelete(id)
    }
}

export default new CartDao()