
// Importar capa de Models --> Datos
import cartDao from "../daos/dbManager/cart.dao.js";


export default class CartsService {

    getAllCarts= async (page, limit,sort,filter) => {
        console.log("hola")
        return cartDao.getAllCarts()
    };

    getById = async (id) => {
        console.log("get cart getById service")
        console.log("service", id)
        return cartDao.getOneCart(id)
    }


    save = async (cartData) => {
        let result = await cartDao.CreateOneCart(cartData);
         //    const newUserInfo = new UserDTO(userInfo);
        return result;
    }

    addProductToCart = (cid,create) => {
        console.log("addProductToCart service")
        console.log(cid, create)
        //return this.dao.getProxductoById(id)
        return cartDao.addProductToCart(cid,create)
    }

    update = async (cid,pid,quantity) => {
        let result = await cartDao.UpdateOneCart(cid,pid,quantity);
        
        return result;
    }

    delete = async (id) => {
        let result = await cartDao.delete(id);
        return result;
    }

}

  
