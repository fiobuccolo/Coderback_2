export default class CartsRepository {
    constructor(dao) {
        this.dao = dao;
    }
    
    getAllCarts= async (page, limit,sort,filter) => {
        console.log("hola")
        return this.dao.getAllCarts()
    };
    getById = async (id) => {
        console.log("get cart getById service")
        console.log("service", id)
        return this.dao.getOneCart(id)
    }

    save = async (cartData) => {
        let result = await this.dao.CreateOneCart(cartData);
         //    const newUserInfo = new UserDTO(userInfo);
        return result;
    }
    
    addProductToCart = (cid,create) => {
        console.log("addProductToCart service")
        console.log(cid, create)
        //return this.dao.getProxductoById(id)
        return this.dao.addProductToCart(cid,create)
    }

    update = async (cid,pid,quantity) => {
        let result = await this.dao.UpdateOneCart(cid,pid,quantity);
        
        return result;
    }

    delete = async (id) => {
        let result = await this.dao.delete(id);
        return result;
    }



};