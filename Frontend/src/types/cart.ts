export type CartItem = {
    image : string ,
    id : number,
    quantity : number,
    countInStock: number,
    price : number,
    name : string,
}

export type ShippingAddress = {
    fullName : string,
    address : string ,
    city : string,
    country : string,
    postalCode : number
}

export type Cart ={
    cartItems : CartItem[],
    shippingAddress : ShippingAddress,
    paymentMethod : string,
    itemsPrice : number,
    shipppingPrice : number,
    taxPrice : number,
    totalPrice : number
}