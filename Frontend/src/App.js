
import './App.css';
import { NavbarComponent } from './Components/Navbar/Navbar';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginSignUp } from './Pages/LoginSignUp';
import { Cart } from './Pages/Cart';
import { ShopCategory } from './Pages/ShopCategory';
import Product from './Pages/Product';
import Shop from './Pages/Shop';
import { Footer } from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kids_banner from './Components/Assets/banner_kids.png'

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/handphone" element={<ShopCategory banner={men_banner} category="handphone" />} />
          <Route path="/kamera" element={<ShopCategory banner={women_banner} category="kamera"/>} />
          <Route path="/laptop" element={<ShopCategory banner={kids_banner} category="laptop"/>} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
