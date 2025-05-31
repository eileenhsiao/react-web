import { Helmet } from 'react-helmet-async';
import '@/index.css';
import Header from '../components/Header';
import Footer from '@/components/Footer';
import ShippingAddressCard from '../components/ShippingAddressCard';
import PaymentMethodCard from '@/components/PaymentCard';
import { useEffect } from 'react';

function Payment() {
  useEffect(() => {
    window.scrollTo(0, 0); // 滾動到頁面頂部
  }, []);

  const title = "結帳";

  return (
    <div className="container mx-auto main-layout min-h-screen">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      <div className="mt-24 px-4 flex flex-col items-center justify-center space-y-8">
        <ShippingAddressCard className="content" />
        
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default Payment;
