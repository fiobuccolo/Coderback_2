import { cartModel } from "../../../models/cart.model.js"
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
    async CreateOneCart(cartData){
        const cart = await cartModel.create(cartData)
        console.log("Dao create cart"+ cart);
        return cart
    }

    // create cart con un product
    async addProductToCart (cid,create) {
        try {
            const response =  await cartModel.findByIdAndUpdate({ _id: cid }, create);
            if(response){
                return (`data: ${response}`)
            } else{throw new Error("Hubo un error")}
        } catch (error) {
          throw error;
        }
     }
    //Update one cart
    async UpdateOneCart(cid,pid,quantity){
        try {
            console.log();
            const response = await cartModel.findByIdAndUpdate(
                { _id: cid },
                { $inc: { 'products.$[elem].quantity': quantity } },
                { arrayFilters: [{ 'elem._id': pid }] }
                )      
            console.log(response);
            if(response){
                    return (`data: ${response}`)
                } else{throw new Error("Hubo un error")}
        } catch (error) {
            console.log(`catch en el Dao UpdateOneCart : ${error}`)  
        }
    }


    //Delete one
    async delete(id){
        return await cartModel.findByIdAndDelete(id)
    }
}

export default new CartDao()