import { Helmet } from 'react-helmet-async';
import Header from '../components/Header'
import Footer from '@/components/Footer'
import products from "@/json/products.json";
import PopularList from '@/components/PopularList'

function Home() {
  const title = "Blissful Bites";
  return (
    <div className="container mx-auto main-layout min-h-screen">
      <Helmet>
          <title>{title}</title>
        </Helmet>
      <Header/>
      <div style={{ marginTop: '61.6px', padding: '0px' }}>
      <img className="w-full content" src="/img/home.svg" alt="logo"/>  
      </div>
      
      <PopularList products={products} className="content" />
     {/*map*/}
      <Footer className="footer" />
    </div>

  )
}

export default Home
