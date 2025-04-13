import { BrowserRouter, Routes, Route } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from "react-redux";

import './App.css';
import Home from '@/pages/Home'
import Product from '@/pages/Detail';
import Category from '@/pages/List'
import store from '@/redux/store';
import About from '@/pages/About';
import Cart from '@/pages/Cart';

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
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
