import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header'
import Footer from '@/components/Footer'
import ProfileCard from '../components/ProfileCard';
import Profilehead from '../components/profilehead';
import { useEffect } from 'react';


function Profile() {
  useEffect(() => {
    window.scrollTo(0, 0); // 滾動到頁面頂部
  }, []);
 const [searchParams] = useSearchParams();
 const redirect = searchParams.get('redirect');


  const title = "個人資料";
  return (
    <div className="container mx-auto main-layout min-h-screen">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      
      <div className="mt-[82px] md:mt-[100px] p-0 ">
            <Profilehead redirect={redirect} /> 
            <ProfileCard redirect={redirect} />
         </div>
      
      <Footer className="footer" />
    </div>

  )
}

export default Profile
