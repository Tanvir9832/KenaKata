import "./cartItems.css"
import { toast } from "react-toastify";
import { CartItem } from '../../types/cart'
import { Link } from "react-router-dom"
import Counter from "../counter/Counter"
import { useContext } from "react"
import { Store } from "../../Store";

const CartItems = ({ id, countInStock, image, name, price, quantity }: CartItem) => {
    const item : CartItem ={
        id,countInStock,image,name,price,quantity
    }
    const {dispatch}= useContext(Store);

    //!increment function
    const incrementCount=()=>{
        
        updateCartHandler(item,quantity+1);
    }

    //!decrement function
    const decrementCount=()=>{
        updateCartHandler(item,quantity-1);
        if(quantity<=1){
            deleteProduct();
        }
    }
    
    //! update function
    const updateCartHandler = (item: CartItem, quantity: number) => {
        console.log(quantity);
        if (item.countInStock < quantity) {
            toast.warn("Sorry, Product is out of stock");
            return;
        }
        dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity } });
    }

    //! delete product
    const deleteProduct =()=>{
        dispatch({type: "REMOVE_FROM_CART" ,payload : item})
    }

    return (
        <div className='cartItem mb-3'>
            <Link to={`/product/${id}`} className="item">
                <img className="imgCartPage" src={image} alt="loading" />
                <p className="nameCartPage">{name}</p>
            </Link>
            <div>
                <p>${price}</p>
            </div>
            <div className="count">
                <p>
                    <Counter count={quantity} increment={incrementCount} decrement={decrementCount} />
                </p>
            </div>
            <div>
                <p>${ price * quantity}</p>
            </div>
            <div>
                <p onClick={deleteProduct} className="text-danger btnDelete">
                <i className="fa-solid fa-xmark"></i>
                </p>
            </div>
        </div>
    )
}

export default CartItems