
import { productModel } from "../models/product.model.js";

class ProductDao{
    //get all
    async getAllProducts(){
        console.log("en el get all products");
        return await productModel.find()
    }

    // paginate
    async getPaginateProducts(page,limit, sort, filter){
        console.log("en el paginate all products");
        console.log(`sort: ${sort}`);
        console.log(`limit: ${limit}`);
        const producs = await productModel.paginate(
            {filter},
            {page,limit}
        );
        console.log(producs)
        return producs 
    }
    
    
      
    //get one
    async getOneProduct(id){
        return await productModel.findById(id)
    }

    //Create one
    async CreateOneProduct(product){
        try {
            //if(!product){return console.log("El product esta vacio")}
            if(!product) throw new Error("El producto está vacío")
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
                return (`data: ${product}`)
                } else{throw new Error("Hubo un error")}
                //else{console.log("Hubo un error")}
        } catch (error) {
            console.log(`catch en el Dao CreateOne producto: ${error}`)
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

