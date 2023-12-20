import { productModel } from "../models/product.model.js";

class ProductDao{
    //get all
    async getAllProducts(){
        return await productModel.find()
    }

    //get one
    async getOneProduct(id){
        return await productModel.findById(id)
    }

    //Create one
    async CreateOneProduct(product){
        try {
            if(!product){return console.log("El product esta vacio");}
            // Validación de codigo existente: 
            const products = await this.getAllProducts()
            console.log(products);
            const productExists= products.some(prod => prod.code === product.code)
                if(productExists){
                    console.log("Ya existe el codigo de producto")
                    return "Ya existe el codigo de producto"
                }
            // -- No existe producto con ese codigo, continuo: 
            const response = await productModel.create(product)
            console.log(response);
            if(response){
                return ({message: `product created`})
                }else{console.log("Hubo un error")}
        } catch (error) {
  
        }
    }

    //Update one
    async UpdateOneProduct(id,product){
        return await productModel.findByIdAndUpdate(id,product)
    }

    //Delete one
    async DeleteOneProduct(id){
        return await productModel.findByIdAndDelete(id)
    }
}

export default new ProductDao()