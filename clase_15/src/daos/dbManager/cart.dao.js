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
    async UpdateOneCart(CartId,productID){
        return await cartModel.findByIdAndUpdate(CartId,productID)
    }

    //Delete one
    async DeleteOneCart(id){
        return await cartModel.findByIdAndDelete(id)
    }
}

export default new CartDao()