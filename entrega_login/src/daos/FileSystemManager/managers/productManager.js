
import { existsSync, readFileSync, promises } from "fs"
export class ProductManager  {

    constructor (fileName){
        this.fileName= fileName
        if(existsSync(fileName)){
            try {
                let products = readFileSync(fileName,"utf-8")
                this.products = JSON.parse(products)
            } catch (error) {
                this.products = [] 
            }
        }else{
        this.products = [] 
        }
    }

    // METODOS

    async saveFile(data){
        try {
            await promises.writeFile(this.fileName,JSON.stringify(data,null, '\t'))
            return true
        } catch (error) {
            console.log(error)
            return false;
        }
    }
     

    getProducts(){
        return this.products
    }

    async addProduct(newProduct){
        try{
            if(!newProduct){
                return console.log("El product esta vacio");
              }
          
            // esta validacion del codigo existente
            const productExists = this.products.some(prod => prod.code === newProduct.code);
          
            if(productExists){
                  console.log("Ya existe el codigo de producto")
                  return "Ya existe el codigo de producto"
              }

             //const product = new Product(title,description,price,thumbnail,code,stock,status,category)
             newProduct.id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
              this.products.push(newProduct)

              const response =  await this.saveFile(this.products)
              console.log(this.products)
              if(response){
                    return ({message: `product created`,product: newProduct})
                }else{
                    console.log("Hubo un error");
                
            }
          }  catch(error){  console.log(`hubo un error: ${error}`);}
                }
      


    getProductById(productId){
        const product = this.products.find((product) => product.id === productId);
        if(!product){
            console.log(`El producto con ID ${productId} no existe`)
            return "No existe el product"
        }
        return product
     }

     async updateProduct(pid,product){
        try{
            const indice = this.products.findIndex(product => product.id === productId);
            console.log(indice)
            if (indice != -1) {
                const { pid, ...rest } = product;
                this.products[indice] = { ...this.products[indice], ...rest };
                const response = await this.saveFile(this.products)
                if(response){
                    console.log("Producto actualizado")
                    return product
                }else{
                    console.log("Hubo un error");
                }
            } else
                console.log(`El producto con ID ${id} no existe`)
                return "No existe el product"
        } 
        catch (error) {
            console.log(error);
        }
     }

     async deleteProduct(productId){
        try {
            const indice = this.products.findIndex(product => product.id === productId);
            if (indice>0) {
                       this.products.splice(indice,1)
                      const response = await this.saveFile(this.products)
                        if(response){
                            console.log("Producto eliminado")
                            return ("Producto eliminado")
                        }else{console.log("Hubo un error");}
                    } 
             else
                console.log(`El producto con ID ${productId} no existe`)
                return "No existe el product"
        } catch (error) {
            console.log("Hubo un error");
            return error
        }
     }

    }
    
    


export class Product{
    constructor(title,description,price,thumbail,code, stock,status,category){
        this.title = title, //string
        this.description = description,//string
        this.price = price, //number
        this.thumbail = thumbail, // array opcionail
        this.code = code, //string
        this.stock = stock //number
        this.status = status //boolean
        this.category = category //string
    }
}

   

