import './footer.css';
import '@/index.css';
import { useSelector } from "react-redux";
import { selectLightMode } from "@/redux/colorSlice";

export default function Footer() {
  const lightMode = useSelector(selectLightMode);
  return (
    /*桌面*/
    <div className="w-full m-0">
      <footer className="footer  text-white py-6">
        {/* 描述區塊 */}
        <div className="footer-content ">
          <img
                        src={lightMode ? "/img/logo.svg" : "/img/logodark.svg"}
                        alt="logo"
                        className="w-33 md:w-55"
                    />
        </div>

        {/* 追蹤我們 */}
        <div className="footer-followUs">
          
          <div className="flex items-center space-x-4">
            <a href="#">
              <img className="w-8 h-8" src={lightMode ? "/img/fb.svg" : "/img/fbdark.svg"} alt="facebook" />
            </a>
            <a href="#">
              <img className="w-8 h-8" src={lightMode ? "/img/ig.svg" : "/img/igdark.svg"} alt="instagram" />
            </a>
          </div>
        </div>

        {/* 聯絡我們 */}
        <div className="footer-contactUs">
          <p className="font-extrabold">門市資訊</p>
          <p >Blissful Bites<br/>門市地址｜106320 106台北市大安區和平東路二段<br/>電話｜02-00000000<br/>營業時間｜12:30-20:30（無固定公休日）</p>
        </div>
        
      </footer> 
      {/* 版權聲明 */}
      <p className="w-full footer-copyRight text-center text-sm md:text-base">
        Copyright 2025 © Blissful Bites
        </p>
    </div>
    /*手機*/
    
  );
}