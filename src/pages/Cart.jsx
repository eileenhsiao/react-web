import { Helmet } from 'react-helmet-async';
import Header from '../components/Header'
import Footer from '@/components/Footer'
import ProductDetail from "@/components/ProductDetail";
import products from "@/json/products.json";

function Cart() {
  const title = "購物車";
    return (
      <div className="container mx-auto main-layout bg-gray-900 min-h-screen">
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
