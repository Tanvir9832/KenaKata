import { useContext, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useGetApiCall } from "../../Hooks/useGetApiCall"
import { useNavigate, useParams } from "react-router-dom"
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/Loading/MessageBox";
import { Col, Container, Row } from "react-bootstrap";
import { Product } from "../../types/product";
import "./ProductPage.css"
import Rating from "../../components/Rating/Rating";
import { Store } from "../../Store";
import { toast } from "react-toastify";
import { productToCartItemConverter } from "../../utils";
import Counter from "../../components/counter/Counter";

const ProductPage = () => {
  const [count, setCount] = useState<number>(0);
  const { id } = useParams();
  type State = {
    products: Product,
    loading: boolean,
    error: string
  }

  const initialState: State = {
    products: {
      id: 0,
      name: "",
      image: "",
      rating: 0,
      category: "",
      brand: "",
      description: "",
      NumberOfReviews: 0,
      price: 0,
      countInStock: 0,
    },
    loading: true,
    error: ""
  }
  const { loading, products, error } = useGetApiCall(`/api/products/${id}`, initialState);

  const { state: { cart }, dispatch } = useContext(Store);


  const navigate = useNavigate();



  //!product add to cart increment

  const increment = () => {
    if (count < products.countInStock) {
      setCount((prev) => prev + 1);
    } else {
      setCount(count);
    }
  }

  //!product add to cart decrement
  const decrement = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    } else {
      count;
    }
  }

  const addToCartHandler = () => {

    if (products.countInStock > 0 && count <= 0) {
      toast.warn('Add some product');
      return;
    }
    const existItem = cart.cartItems.find((item) => item.id === products.id);
    const quantity = existItem ? existItem.quantity + count : count;

    if (products.countInStock < quantity) {
      toast.warn('Sorry, Product is out of stock');
      return;
    }
    if (products.countInStock <= 0) {
      toast.warn('Sorry, Product is out of stock');
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: { ...productToCartItemConverter(products!), quantity } });
    toast.success("Product added to the cart");
    navigate('/cart');
  }


  return (
    loading ? (
      <Loading />
    ) : error ? (
      <MessageBox variant="danger">Product Not Found</MessageBox>
    ) : (
      <div >
        <Helmet>
          <title>Product</title>
        </Helmet>
        <Container>
          <Row className="product">
            <Col md={12} lg={6}>
              <img className="productImg" src={products.image} />
            </Col>
            <Col className="productDetails">
              <h2>{products.name}</h2>
              <div className="ratingProductPage">
                <Rating rating={products.rating} numReviews={products.NumberOfReviews} />
              </div>
              <div className="priceProductPage">
                <p> MRP : <del>{`$${products.price + 25}`}</del> </p>
                <p className="priceTodayProductPage">Deal of the day: ${products.price} </p>
              </div>
              <p className="productDescription">
                {products.description}
              </p>

              <div className="productsDeliveryData">
                <div className="productDelivery">
                  <i className="fa-solid fa-truck-front deliveryIcon"></i>
                  <p>Free Delivery</p>
                </div>
                <div className="productDelivery">
                  <i className="fa-solid fa-meteor deliveryIcon"></i>
                  <p>30 Days Replacement</p>
                </div>
                <div className="productDelivery">
                  <i className="fa-solid fa-truck-fast deliveryIcon"></i>
                  <p>Fastest Delivery</p>
                </div>
                <div className="productDelivery">
                  <i className="fa-brands fa-dropbox deliveryIcon"></i>
                  <p>2 Year Warranty</p>
                </div>
              </div>
              <div className="bandAndAvailabity">
                <div className="firstPproductpage">Available: <span className="brand">{products.countInStock > 0 ? `In stock (${products.countInStock})` : "Out of stock"}</span></div>
                <div className="pproductpage">Product ID : <span className="brand">{products.id}</span> </div>
                <div className="pproductpage">Brand : <span className="brand">{products.brand}</span></div>
              </div>
              {
                products.countInStock > 0 ? <Counter increment={increment} decrement={decrement} count={count} /> : null
              }
              <button onClick={addToCartHandler} className={products.countInStock > 0 ? "productButton" : "productButtonOFT"}>ADD TO CART</button>
            </Col>
          </Row>
        </Container>
      </div>
    )
  )
}

export default ProductPage