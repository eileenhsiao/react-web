import { Helmet } from 'react-helmet-async';
import Header from '../components/Header'
import ProductList from '@/components/ProductList'
import Footer from '@/components/Footer'
import products from "@/json/products.json";

function Home() {
  const title = "Blissful Bites";
  return (
    <div className="container mx-auto main-layout bg-gray-900 min-h-screen">
      <Helmet>
          <title>{title}</title>
        </Helmet>
      <Header/>
      <div style={{ marginTop: '10px', padding: '20px 0px' }}>
      <img className="w-full" src="/img/home.svg" alt="logo"/>  
      </div>
      
      
      <ProductList products={products} className="content" />
     {/*map*/}
      <Footer className="footer" />
    </div>

  )
}

export default Home
