import { BrowserRouter, Routes, Route } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from "react-redux";

import './App.css';
import Home from '@/pages/Home'
import Product from '@/pages/Detail';
import Category from '@/pages/List'
import store from '@/redux/store';
import About from '@/pages/About';
import Login from '@/pages/Login';
import Cart from '@/pages/Cart';
import ForgetPassword from '@/pages/ForgetPassword';
import Payment from '@/pages/Payment';
import PlaceOrder from '@/pages/PlaceOrder';
import Profile from '@/pages/Profile';
import Register from '@/pages/Register';


//feedProducts();

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider context={{}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="products">
            <Route path="list/:categoryName" element={<Category />} />
              <Route path="id/:productId" element={<Product />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget_password" element={<ForgetPassword />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/place_order" element={<PlaceOrder />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
