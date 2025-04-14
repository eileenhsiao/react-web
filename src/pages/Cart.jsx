import { Helmet } from 'react-helmet-async';
import '@/index.css';
import Header from '../components/Header'
import Footer from '@/components/Footer'
import CartList from '@/components/CartList';
import { useEffect } from 'react';

function Cart() {
  useEffect(() => {
    window.scrollTo(0, 0); // 滾動到頁面頂部
  }, []);
  
  const title = "購物車";
    return (
      <div className="container mx-auto main-layout bg-gray-900 min-h-screen">
        <Helmet>
            <title>{title}</title>
          </Helmet>
        <Header/>
        <div style={{ marginTop: '100px', padding: '20px' }}></div>
        <CartList/>
        <Footer className="footer" />
      </div>
  
    )
}

export default Cart
