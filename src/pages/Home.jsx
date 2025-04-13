import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';
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
      <Header />
      <div style={{ marginTop: '10px', padding: '0px' }}>
        <img className="w-full content" src="/img/home.svg" alt="logo" />
      </div>

      <ProductList products={products.slice(0, 4)} className="content" />
      <Link to="/products/list/all">
      <button className="btn btn-primary px-8 py-5">
        <span className="font-thin ml-3">查看全部商品</span>
      </button>
      </Link>
      
      {/*map*/}
      <div className="w-full h-[400px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.2770044097538!2d121.54220407488506!3d25.024671838667988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442aa2e94f1cc1b%3A0x824de6c6ac711612!2zMTA25Y-w5YyX5biC5aSn5a6J5Y2A5ZKM5bmz5p2x6Lev5LqM5q61!5e0!3m2!1szh-TW!2stw!4v1744543937327!5m2!1szh-TW!2stw"
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
