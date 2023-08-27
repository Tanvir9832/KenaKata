import { Col, Container, Row } from 'react-bootstrap'
import { Product } from '../../types/product'
import Loading from '../Loading/Loading'
import MessageBox from '../Loading/MessageBox'
import ProductItems from '../ProductItems/ProductItems'
import { Helmet } from 'react-helmet-async'
import "./Products.css"
import { useGetApiCall } from '../../Hooks/useGetApiCall'


const Products = () => {
  type State = {
    products: Product[],
    loading: true,
    error: ""
  }

  const initialState: State = {
    products: [],
    loading: true,
    error: ""
  }
  const { products, loading, error } = useGetApiCall<State>("/", initialState);

  return (
    loading ? (
      <Loading />
    ) : error ? (
      <MessageBox variant='danger'>{error}</MessageBox>
    )
      : (
        <Container className='my-4 products'>
          <Row className='allProducts'>
            <Helmet>
              <title>KenaKata</title>
            </Helmet>
            {
              products.map((pro: Product) => {
                return (
                  <Col className='mb-4' key={pro.id} sm={6} md={4} lg={3} >
                    <ProductItems product={pro} />
                  </Col>
                )
              })
            }
          </Row>
        </Container>
      )
  )
}

export default Products