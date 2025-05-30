import { Helmet } from 'react-helmet-async';
import '@/index.css';
import Header from '../components/Header'
import Footer from '@/components/Footer'
import SendOrder from '@/components/SendOrder';
import { useEffect } from 'react';

function SendOrder() {
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
        <div style={{ marginTop: '100px', padding: '10px' }}></div>
        <SendOrder className="content"/>
        <Footer className="footer" />
      </div>
  
    )
}

export default SendOrder
