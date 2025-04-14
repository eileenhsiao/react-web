import { Helmet } from 'react-helmet-async';
import Header from '../components/Header'
import Footer from '@/components/Footer'
import ProductDetail from "@/components/ProductDetail";
import products from "@/json/products.json";
import { useEffect } from 'react';

function Cart() {
  useEffect(() => {
    window.scrollTo(0, 0); // 滾動到頁面頂部
  }, []);
  
  const title = "購物車";
    return (
      <div className="container mx-auto main-layout min-h-screen">
        <Helmet>
            <title>{title}</title>
          </Helmet>
        <Header/>
        <div style={{ marginTop: '100px', padding: '20px' }}></div>
        
        <Footer className="footer" />
      </div>
  
    )
}

export default Cart
