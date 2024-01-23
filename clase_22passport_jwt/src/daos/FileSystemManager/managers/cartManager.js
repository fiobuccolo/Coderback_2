
import { existsSync, readFileSync, promises } from "fs"
import { ProductManager } from "./productManager.js"
const products = new ProductManager('files/productos.json');

export class CartManager  {

    constructor (fileName){
        this.fileName= fileName;
        if(existsSync(fileName)){
            try {
                let carts = readFileSync(fileName,"utf-8")
                this.carts = JSON.parse(carts)
               
            } catch (error) {
                this.carts = [] 
            }
        }else{
        this.carts = [] 
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
     

     getCarts(){
        return this.carts
    }

    async addCart(cart){
        try{  
            cart = new Cart()
            cart.id = this.carts.length > 0 ? this.carts[this.carts.length - 1].id + 1 : 1;
            this.carts.push(cart)
              const response =  await this.saveFile(this.carts)
              console.log(this.carts)
              if(response){
                    return ({message: `cart created`, carts: this.carts})
                }else{
                    console.log("Hubo un error");
                
            }
          }  catch(error){  console.log(`hubo un error: ${error}`);}
                }
      


    getCartById(cid){
        console.log("estoy en el get cart by id");
        const cart = this.carts.find((cart) => cart.id === cid);
        if(!cart){
            console.log(`El cart con ID ${cid} no existe`)
            return "No existe el cart"
        }
        return cart
     }

     // TODO: validar todo  
     async updateCart(cartId,productId){
        try{
           
            const indiceCart = this.carts.findIndex(cart => cart.id === cartId);
            console.log(indiceCart);
             // TODO: no puedo validar que el producto exista. No se como instanciar el product manager haciendo referencia al archivo ya existente
             const prods = await products.getProducts()   
             const indiceProduct = prods.findIndex(p => p.id === productId);
                 console.log(indiceProduct);
            if(indiceCart < 0 ||indiceProduct < 0 ){return "El id de producto o de cart no existe"}

             // TO DO logica de si el producto ya esta en el carrito para saber si lo agrego o le sumo cantidad
    
            if (indiceCart != -1) {
                // TO DO logica de agregar producto al carrito
                const response = await this.saveFile(this.carts)
                if(response){
                    console.log("Cart actualizado")
                    return cart
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

     async deleteCart(cartId){
        try {
            const indice = this.carts.findIndex(cart => cart.id === cartId);
            console.log(`indice: ${indice}`);
            if(indice>0) {
                console.log(("entre al if"));
                    this.carts.splice(indice,1)
                    const response = await this.saveFile(this.carts)
                if(response){
                    console.log("Producto eliminado")
                    return ("Producto eliminado")
                }else{
                    console.log("Hubo un error");
                }
            } 
             else{
                console.log(("entre al else"));
                console.log(`El carts con ID ${cartId} no existe`)
                return "No existe el cart"}
        } catch (error) {
            console.log("Hubo un error");
            return error
        }
     }

    }
    
    

// TODO la class del cart
export class Cart{
    constructor(products){
        
        this.products= []
    }
}



