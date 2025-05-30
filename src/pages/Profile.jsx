import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header'
import Footer from '@/components/Footer'
import ProfileCard from '../components/ProfileCard';
import { useEffect } from 'react';


function Profile() {
  useEffect(() => {
    window.scrollTo(0, 0); // 滾動到頁面頂部
  }, []);
  const {
    token: { colorBgBase, colorTextBase },
 } = theme.useToken();
 const [searchParams] = useSearchParams();
 const redirect = searchParams.get('redirect');


  const title = "個人頁面";
  return (
    <div className="container mx-auto main-layout min-h-screen">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      
      <div className="layoutContent container">
            <ProfileCard redirect={redirect} />
         </div>
         <ProfileCard redirect={redirect} />
      
      <Footer className="footer" />
    </div>

  )
}

export default Profile
