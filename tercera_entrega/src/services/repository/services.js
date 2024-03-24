import CartDao from "../daos/mongo/cart.dao.js";
import ProductDao from "../daos/mongo/product.dao.js";

import CartsRepository from "./carts.repository.js";
import ProductsRepository from "./products.repository.js";

const productDao = new ProductDao();
const cartDao = new CartDao();

export const cartsService = new CartsRepository(cartDao);
export const productService = new ProductsRepository(productDao);