
// Importar capa de Models --> Datos
import productDao from "../daos/dbManager/product.dao.js";


export const getAllProducts = async (page, limit,sort,filter) => {
        console.log("hola")
        return productDao.getProductsManager()
    };

export const getProduct = (id) => {
        console.log("get producto service")
        console.log("service", id)
        return productDao.getOneProduct(id)
    }


// ------- PENDING ----------- 

    // findProduct = (code) => {
    //     console.log("find producto service")
    //     console.log("service", code)
    //     //return this.dao.getProductoById(id)
    //     return this.dao.getProductoByCode(code)
    // }

    //  async insertProduct(newProduct) {
    //     try {
    //       console.log("desde el repository");
    //      //    const newUserInfo = new UserDTO(userInfo);
    //       return await this.dao.insert(newProduct);
    //     } catch (error) {
    //         throw error;
    //     }
    //  }

    //  async updateProduct(pid, props){
    //     try {
    //         console.log("update el repository");
    //         return await this.dao.updateProduct(pid, props);
    //     } catch (error) {
    //         throw error;
    //     }
    //  }

    //  async deleteProduct(pid){
    //     try {
    //         console.log("delete el repository");
    //         return await this.dao.deleteProduct(pid)
    //     } catch (error) {
    //         throw error;
    //     }
    //  }
    // // createUser = (user) => {
    //     return this.dao.saveUser(user);
    // };

