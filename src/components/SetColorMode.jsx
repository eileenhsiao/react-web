import { useSelector, useDispatch } from "react-redux";
import { Sun, Moon } from "lucide-react";
import { selectLightMode, setColorMode } from "@/redux/colorSlice";
import { useEffect } from "react";  // 引入 useEffect
import '@/index.css';

export default function SetColorMode() {
   const lightMode = useSelector(selectLightMode);
   const dispatch = useDispatch();

   // 使用 useEffect 在組件渲染時初始化顏色模式
   useEffect(() => {
      if (lightMode) {
         document.documentElement.setAttribute('data-theme', 'light');
      } else {
         document.documentElement.setAttribute('data-theme', 'dark');
      }
   }, [lightMode]); // 依賴 lightMode，當 lightMode 改變時執行

   const toggleColor = () => {
      // 切換顏色模式
      dispatch(setColorMode(!lightMode));
   };

   return (
      <div onClick={toggleColor} className="cursor-pointer">
         {
            lightMode ? (
               <Sun className="w-5 h-5 md:w-6 md:h-6 text-current group-hover:scale-105 transition-transform" />
            ) : (
               <Moon className="w-5 h-5 md:w-6 md:h-6 text-current group-hover:scale-105 transition-transform" /> 
            )
         }
      </div>
   );
}
