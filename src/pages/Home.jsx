import { Helmet } from 'react-helmet-async';
import Header from '../components/Header'
import Footer from '@/components/Footer'
import products from "@/json/products.json";
import PopularList from '@/components/PopularList'
import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0); // 滾動到頁面頂部
  }, []);

  const title = "Blissful Bites";
  return (
    <div className="container mx-auto main-layout min-h-screen">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      <div style={{ marginTop: '61.6px', padding: '0px' }}>
        <img className="w-full content" src="/img/home.svg" alt="logo" />
      </div>

      <PopularList products={products} className="content" />
      
        <div className="w-full h-[300px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2149.657085887979!2d121.5430963775525!3d25.024642280173644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1szh-TW!2stw!4v1744645054150!5m2!1szh-TW!2stw"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      
      <Footer className="footer" />
    </div>

  )
}

export default Home
