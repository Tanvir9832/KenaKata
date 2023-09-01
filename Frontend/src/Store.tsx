import React, { useReducer } from "react"
import { Cart, CartItem } from "./types/cart"

type AppState = {
    cart: Cart
}

const initialState: AppState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')!) : [],
        itemsPrice: 0,
        paymentMethod: localStorage.getItem('paymentMethod') ? localStorage.getItem('paymentMethod')! : 'paypal',
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')!) : {},
        shipppingPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
    }
}

type Action = { type: "ADD_TO_CART", payload: CartItem } | { type: "REMOVE_FROM_CART" ,payload : CartItem } | {type :"CLEAR_CART"}

function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'ADD_TO_CART':
            {
                const newItem = action.payload;
                const existItem = state.cart.cartItems.find((item: CartItem) => item.id === newItem.id);

                const cartItems = existItem ? state.cart.cartItems.map((item: CartItem) => item.id === existItem.id ? newItem : item) : [...state.cart.cartItems, newItem];
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                return { ...state, cart: { ...state.cart, cartItems } };
            }
        case 'REMOVE_FROM_CART' :{
            const item = action.payload;
            const cartItems = state.cart.cartItems.filter((i : CartItem)=>item.id !== i.id);
            
            localStorage.setItem('cartItems',JSON.stringify(cartItems));
           return {...state,cart : {...state.cart , cartItems}}
        } 
        case 'CLEAR_CART':{
            localStorage.setItem('cartItems',JSON.stringify([]));
            const cartItems = JSON.parse(localStorage.getItem('cartItems')!);
            return {...state , cart : {...state.cart , cartItems}}
        }
        default:
            return state
    }
}

 const defaultDispatch: React.Dispatch<Action> = () => initialState;

const Store = React.createContext({
    state: initialState,
    dispatch: defaultDispatch
})

function StoreProvider(props : React.PropsWithChildren<{}>) {
    const [state, dispatch] = useReducer<React.Reducer<AppState, Action>>(reducer, initialState);
    return <Store.Provider value={{ state, dispatch }}>{props.children}</Store.Provider>
}

export { Store, StoreProvider };