import { useContext  } from "react"
import { Store } from "../../Store";
import "./CartPage.css";
import { Helmet } from "react-helmet-async";
import CartItems from "../../components/cartItems/CartItems";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const { state: { cart: { cartItems } }, dispatch } = useContext(Store);
    const navigate = useNavigate();
    // console.log(cartItems);
    const clearCartFunction =()=>{
        dispatch({type : "CLEAR_CART"});
    }
    return (
        <div>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            {
                cartItems.length <= 0 ? (
                    <div className="noItem">
                        <h1 className="text-center">No Item In Cart</h1>
                    </div>
                ) : (

                    <div className="cartPageMain">
                        <div className="container mt-5">
                            <div className="cartPage">
                                <p>Item</p>
                                <p>Price</p>
                                <p>Quantity</p>
                                <p>Subtotal</p>
                                <p>Remove</p>
                            </div>
                            <hr className="hr" />
                            <div className="mb-3">
                                {
                                    cartItems.map((item) => {
                                        return (
                                            <CartItems key={item.id} {...item} />


                                        )
                                    })
                                }
                            </div>
                            <hr />

                            <div className="buttons">
                                <button onClick={clearCartFunction} className="clearBtn">CLEAR CART</button>
                                <button onClick={() => navigate("/shipping")} className="continueBtn">PROCEED TO CHECKOUT</button>
                            </div>
                            
                                <div className="calculation">
                                    <div className="subTotal">
                                        <p>Subtotal:</p>
                                        <p className="fw-bold">
                                            {
                                                `${cartItems.reduce((prev, curr) => prev + curr.price * curr.quantity, 0)}$`
                                            }
                                        </p>
                                    </div>
                                    <div className="shippingFee">
                                        <p>Shipping Fee:</p>
                                        <p className="fw-bold">{50}$</p>
                                    </div>
                                    <hr />
                                    <div className="total">
                                        <span>Total:</span><span className="fw-bold">{cartItems.reduce((prev, cur) => prev + cur.price * cur.quantity, 0) + 50}$</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                   
                )
            }
        </div>
    )
}
//
export default CartPage