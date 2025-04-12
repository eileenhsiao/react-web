import { Helmet } from 'react-helmet-async';
import Header from '../components/Header'
import Footer from '@/components/Footer'


function About() {
  const title = "關於我們";
    return (
      <div className="container mx-auto main-layout bg-gray-900 min-h-screen">
        <Helmet>
            <title>{title}</title>
          </Helmet>
        <Header/>
        <div style={{ marginTop: '100px', padding: '20px' }}></div>
        <img className="w-full" src="/img/aboutus.svg" alt="AboutUs" />
        <Footer className="footer" />
      </div>
  
    )
}

export default About
