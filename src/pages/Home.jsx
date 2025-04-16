import { Helmet } from 'react-helmet-async';
import Header from '../components/Header'
import Footer from '@/components/Footer'
import products from "@/json/products.json";
import PopularList from '@/components/PopularList'
import { useEffect } from 'react';
import Map from '@/components/Map';
import SlideShow from "@/components/SlideShow";

const images = [
  "/img/home.svg",
  "/img/aboutus.svg"
];
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
      <div className="mt-[92px] md:mt-[61.6px] p-0" >
        
        <SlideShow images={images} />
        <PopularList products={products} className="content" />
      </div>

      
      
      <Map/>
      
      <Footer className="footer" />
    </div>

  )
}

export default Home
