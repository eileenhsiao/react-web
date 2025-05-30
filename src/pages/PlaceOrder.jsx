import { Helmet } from 'react-helmet-async';
import Header from '../components/Header'
import Footer from '@/components/Footer'

import { useEffect } from 'react';


function PlaceOrder() {
  useEffect(() => {
    window.scrollTo(0, 0); // 滾動到頁面頂部
  }, []);

  const title = "登入";
  return (
    <div className="container mx-auto main-layout min-h-screen">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      

      
      
      <Footer className="footer" />
    </div>

  )
}

export default PlaceOrder
