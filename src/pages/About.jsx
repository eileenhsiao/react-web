import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import { selectLightMode } from "@/redux/colorSlice";
import { useState } from 'react';
import { useSelector } from 'react-redux';


function About() {
    const [isOpen, setIsOpen] = useState(false);
    const lightMode = useSelector(selectLightMode);

  useEffect(() => {
    window.scrollTo(0, 0); // 滾動到頁面頂部
  }, []);

  const title = "關於我們";

  return (
    <div className="container mx-auto main-layout min-h-screen">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Header />

      
      <div style={{ marginTop: '61.6px', padding: '0px' }}>
        <img className="w-full content" src="/img/aboutus.svg" alt="AboutUs" />
      </div>

     
      <div className="text-center my-8 px-4">
      <div className="flex justify-center mb-4">
        <img
          src={lightMode ? "/img/logo.svg" : "/img/logodark.svg"}
          alt="logo"
          className="h-6"
        />
      </div>
        <h2 className="text-primary font-bold mb-6">"讓每一口，都是美好的記憶。"</h2>
        <p className="text-left text-base max-w-2xl mx-auto c-text leading-relaxed mb-10">
        在快節奏的日常中，Blissful Bites 以一口甜點，帶來一瞬幸福。
        <br/><br/>
        我們堅信，每個人都值得擁有屬於自己的甜蜜時光。因此，我們用心挑選食材、精緻製作每一道甜點，從外觀到口感，注重每一個細節。
        <br/><br/>
        無論是綿密入口的乳酪蛋糕、酥香誘人的手工餅乾，還是季節限定的創意甜點，Blissful Bites 都希望能為你帶來療癒心靈的美好滋味。
        <br/><br/>
        Blissful Bites，不只是甜點店，是一個讓你放慢腳步、重新感受幸福的小角落。
        </p>
      </div>

      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 mb-10 max-w-2xl mx-auto">
        <img src="/img/bite1.svg" alt="bite1" className=" object-cover w-full" />
        <img src="/img/bite2.svg" alt="bite2" className=" object-cover w-full" />
        <img src="/img/bite3.svg" alt="bite3" className=" object-cover w-full" />
        <img src="/img/bite4.svg" alt="bite4" className=" object-cover w-full" />
      </div>

      <Footer className="footer" />
    </div>
  );
}

export default About;
