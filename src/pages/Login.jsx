import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header'
import Footer from '@/components/Footer'
import LoginCard from '../components/LoginCard';
import { useEffect } from 'react';


function Login() {
  useEffect(() => {
    window.scrollTo(0, 0); // 滾動到頁面頂部
  }, []);
  const {
    token: { colorBgBase, colorTextBase },
 } = theme.useToken();
 const [searchParams] = useSearchParams();
 const redirect = searchParams.get('redirect');


  const title = "登入";
  return (
    <div className="container mx-auto main-layout min-h-screen">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      
      <div className="layoutContent container">
            <LoginCard redirect={redirect} />
         </div>
         <LoginCard redirect={redirect} />
      
      <Footer className="footer" />
    </div>

  )
}

export default Login
