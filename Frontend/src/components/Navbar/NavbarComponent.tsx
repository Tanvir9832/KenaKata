import { useContext } from 'react';
import { Navbar, Container, Badge } from 'react-bootstrap'
import "./NavbarComponents.css"
import { Link } from 'react-router-dom'
import logo from "../../../public/KenaKata.png"
import { Store } from '../../Store'

const NavbarComponent = () => {
  const { state: { cart } } = useContext(Store);
  return (
    <Navbar className='Nabvar' expand="lg">

      <Container className='flex'>
        <Navbar.Brand >
          <Link to="/">
            <img className='logo' src={logo} />
          </Link>
        </Navbar.Brand>
        {/* <input type='search' className='search' /> */}
        <div className='links'>
          <Link className='text-decoration-none mr-4' to='/cart'>Cart
            {cart.cartItems.length > 0 && (
              <Badge pill bg="danger">
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </Badge>
              
            )

            }
          </Link>
          <Link className='text-decoration-none mr-4' to='/signin'>Sign In</Link>
        </div>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent



