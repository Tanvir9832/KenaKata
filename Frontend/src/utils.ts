import { ApiError } from "./types/ApiError";
import { CartItem } from "./types/cart";
import { Product } from "./types/product";

export const getError = (error: ApiError): string => {
    return error.response && error.response.data.message ? error.response.data.message : error.message
}

export const productToCartItemConverter = (product: Product): CartItem => {
    const cartItem: CartItem = {
        image: product.image,
        id: product.id,
        quantity: 1,
        countInStock: product.countInStock,
        price: product.price,
        name: product.name
    }
    return cartItem;
}