import { useContext } from 'react';
import { Card } from "react-bootstrap"
import { toast } from 'react-toastify'
import { Product } from "../../types/product"
import { Link } from "react-router-dom"
import Rating from "../Rating/Rating"
import "./ProductItems.css"
import { Store } from "../../Store"
import { productToCartItemConverter } from '../../utils';
import { CartItem } from '../../types/cart';

const ProductItems = ({ product }: { product: Product }) => {
  const { state, dispatch } = useContext(Store);
  const { cart: { cartItems } } = state;

  //!Add to cart function
  const addToCart = (p: Product) => {
    const existItem = cartItems.find((item) => item.id === p.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const cartItem: CartItem = productToCartItemConverter(p);
    cartItem.quantity = quantity;
    if (product.countInStock < quantity) {
      toast.warn('Sorry, Product is out of stock', {

      });
      return;
    }

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    toast.success("Product added to the cart");
  }


  return (
    <Card className="card">
      <Link to={`/product/${product.id}`}>
        <img className="productImg" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link className='text-decoration-none' to={`/product/${product.id}`}>
          <Card.Title className="productName">{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.NumberOfReviews} />
        <Card.Text className="price">{`$${product.price}`}</Card.Text>
        {
          product.countInStock === 0 ? (
            <button className="btnOFC">Out of stock</button>
          ) : (
            <button onClick={() => addToCart(product)} className="btnATC" >Add to cart</button>
          )
        }
      </Card.Body>
    </Card>
  )
}

export default ProductItems