import { Helmet } from 'react-helmet-async';
import Header from '../components/Header'
import Footer from '@/components/Footer'
import { useEffect } from 'react';

function About() {
  useEffect(() => {
    window.scrollTo(0, 0); // 滾動到頁面頂部
  }, []);
  
  const title = "關於我們";
    return (
      <div className="container mx-auto main-layout min-h-screen">
        <Helmet>
            <title>{title}</title>
          </Helmet>
        <Header/>
        <div style={{ marginTop: '61.6px', padding: '0px' }}>
          <img className="w-full content" src="/img/aboutus.svg" alt="AboutUs" />
        </div>
        
        <Footer className="footer" />
      </div>
  
    )
}

export default About
