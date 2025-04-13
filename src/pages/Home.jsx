import { Helmet } from 'react-helmet-async';
import Header from '../components/Header'
import ProductList from '@/components/ProductList'
import Footer from '@/components/Footer'
import products from "@/json/products.json";
import '@/index.css';

function Home() {
  const title = "Blissful Bites";
  return (
    <div className="container mx-auto main-layout min-h-screen">
      <Helmet>
          <title>{title}</title>
        </Helmet>
      <Header/>
      <div style={{ marginTop: '10px', padding: '0px' }}>
      <img className="w-full content" src="/img/home.svg" alt="logo"/>  
      </div>
      
      <ProductList products={products} className="content" />
     {/*map*/}
      <Footer className="footer" />
    </div>

  )
}

export default Home
