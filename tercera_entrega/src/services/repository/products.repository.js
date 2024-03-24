export default class ProductsRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getAllProducts = async (page, limit,sort,filter) => {
        console.log("hola")
        return this.dao.getProductsManager()
    };
   
    getById = async (id) => {
        console.log("get producto getById service")
        console.log("service", id)
        return this.dao.getOneProduct(id)
    }
    getByCode = async (code) => {
        console.log("get producto getBy code service")
        console.log("service", code)
        return this.dao.getOneProduct(code)
    }
    save = async (product) => {
        let result = await this.dao.create(product);
         //    const newUserInfo = new UserDTO(userInfo);
         console.log("result" + result);
        return result;
    }
    update = async (id, props) => {
        let result = await this.dao.update(id, props);
        
        return result;
    }

    delete = async (id) => {
        let result = await this.dao.delete(id); 
        return result;
    }
    
};

