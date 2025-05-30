import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header'
import Footer from '@/components/Footer'
import LoginCard from '../components/LoginCard';



function Login() {
 const [searchParams] = useSearchParams();
 const redirect = searchParams.get('redirect');


  const title = "登入";
  return (
    <div className="container mx-auto main-layout min-h-screen">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      
      <div className="mt-[72px] md:mt-[61.6px] p-0 layoutContent container">
            <LoginCard redirect={redirect} />
         </div>
      
      <Footer className="footer" />
    </div>

  )
}

export default Login
