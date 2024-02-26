
// Importar capa de Models --> Datos
import productDao from "../daos/dbManager/product.dao.js";


export default class ProductsService {

    getAllProducts = async (page, limit,sort,filter) => {
        console.log("hola")
        return productDao.getProductsManager()
    };

    getById = async (id) => {
        console.log("get producto getById service")
        console.log("service", id)
        return productDao.getOneProduct(id)
    }

    getByCode = async (code) => {
        console.log("get producto getBy code service")
        console.log("service", code)
        return productDao.getOneProduct(code)
    }

    save = async (product) => {
        let result = await productDao.create(product);
         //    const newUserInfo = new UserDTO(userInfo);
         console.log("result" + result);
        return result;
    }

    update = async (id, props) => {
        let result = await productDao.update(id, props);
        
        return result;
    }

    delete = async (id) => {
        let result = await productDao.delete(id); 
        return result;
    }

}

  
