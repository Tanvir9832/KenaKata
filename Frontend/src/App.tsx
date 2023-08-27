import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from "react-helmet-async";
import './App.css'
import Home from './pages/HomePage/Home'
import No from './pages/NO/No'
import CartPage from "./pages/CartPage/CartPage"
import ProductPage from './pages/ProductPage/ProductPage';
import Footer from './components/Footer/Footer';
import { StoreProvider } from './Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarComponent from './components/Navbar/NavbarComponent';

const App = () => {
  return (
    <BrowserRouter>
      <HelmetProvider>
      <StoreProvider>
        <NavbarComponent />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path='*' element={<No />} />
        </Routes>
        <ToastContainer position="bottom-center" />
        </StoreProvider>
        <Footer />
      </HelmetProvider>
    </BrowserRouter>

  )
}

export default App
