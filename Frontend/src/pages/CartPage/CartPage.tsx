import { useContext } from "react"
import { Store } from "../../Store";
import "./CartPage.css";
import { Helmet } from "react-helmet-async";
import CartItems from "../../components/cartItems/CartItems";

const CartPage = () => {
    const { state: { cart: { cartItems } }} = useContext(Store);

    // console.log(cartItems);
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

                    <div>
                        <div className="container mt-3">
                            <div className="cartPage">
                                <p>Item</p>
                                <p>Price</p>
                                <p>Quantity</p>
                                <p>Subtotal</p>
                                <p>Remove</p>
                            </div>
                            <hr className="hr"/>
                            <div className="mb-3">
                                {
                                    cartItems.map((item)=>{
                                        return(
                                                <CartItems key={item.id} {...item} />

                                           
                                        )
                                    })
                                }
                            </div>
                            <hr />

                            <div className="buttons">
                                <button className="continueBtn">CONTINUE SHOPPING</button>
                                <button className="clearBtn">CLEAR CART</button>
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