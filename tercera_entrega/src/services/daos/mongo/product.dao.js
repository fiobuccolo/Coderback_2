

import { productModel } from "../../../models/product.model.js";
class ProductDao{
   
// ------- DONE -----------
    async getProductsManager(page,limit, sort, filter){
        const query = {}
        console.log(("en el paginate"));
        if (filter != undefined){ // Se divide el parámetro en dos partes: campo y valor
                const {field, value} = filter.split(":")
        
        const textFields = ["title", "category", "description"]; // Lista de campos de texto permitidos para filtrar
        const exactFields = ["_id", "price", "code", "status"]; // Lista de campos exactos permitidos para filtrar
          
        // si el campo es un campo de texto, se crea una expresión regular para buscar el valor sin importar mayúsculas ni minúsculas
        if (textFields.includes(field)){ query[field] = {$regex: new RegExp(value, "i")}}
            // si el campo es un campo exacto, se asigna el valor tal cual
             else if (exactFields.includes(field)) query[field] = value;
            // si el campo no es ninguno de los anteriores
            else throw Error("El campo que desea filtrar no existe."); // Se lanza un error
        }
        const orderedQuery = productModel.find(query).sort({ price: sort === "desc" ? -1 : 1 }); // Se crea la consulta con los filtros y se ordena por precio
           try {
                const products = await productModel.paginate(orderedQuery, { page: page || 1, limit: limit || 10}); // Se ejecuta la consulta con paginación
            // Se crea un objeto con los datos de paginación y los productos
                const newObject = {
                status: "succes",
                payload: products.docs,
                totalDocs: products.totalDocs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: products.hasPrevPage ? `api/products?limit=${limit}&page=${products.prevPage}` : null,
                nextLink: products.hasNextPage ? `api/products?limit=${limit}&page=${products.nextPage}` : null,    
                };
    
                 return newObject;
          
                } catch (e) {
                     throw Error(e.message); 
                   } 
            
            }
    
    //get one
    async getOneProduct(id){
        return await productModel.findById(id)
    }
    async create(product){
        try {
            if(!product) throw new Error("El producto está vacío")
            // Validación de codigo existente: 
            const products = await this.getProductsManager()
            console.log(products.payload);
            const productExists= products.payload.some(prod => prod.id === product.id)
                if(productExists){
                    console.log("Ya existe el codigo de producto")
                    return "Ya existe el codigo de producto"
                }
            // -- No existe producto con ese codigo, continuo: 
            const response = await productModel.create(product)
            console.log(response._id);
            if(response){
                return (`data: ${response}`)
                } else{throw new Error("Hubo un error")}
        } catch (error) {
            console.log(`catch en el Dao CreateOne producto: ${error}`)
            throw Error(error)
           
        }
    }

    async update(id, props){
        return await productModel.findByIdAndUpdate(id,props)
    }
     
    async delete(id){
        try {
            console.log("en el dao delete");
            console.log(id);
            const result = await productModel.findByIdAndDelete(id)
            console.log(result);
            return result
        } catch (error) {
            console.log(`catch en el Dao deleteone producto: ${error}`)
            throw Error(error)
        }
        
    }
}

export default new ProductDao()

