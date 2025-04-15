import { NavLink } from 'react-router';
import { useState } from 'react';
import '@/index.css';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navBarContent = [
    { to: "/products/list/all", label: "全部" },
    { to: "/products/list/cake", label: "蛋糕" },
    { to: "/products/list/pie_tart", label: "派＆塔" },
    { to: "/products/list/puff", label: "泡芙" },
    { to: "/products/list/other", label: "其他" },
    { to: "/products/list/gift_box", label: "禮盒" }
  ];  

  const NavBarContent = () => (
    <div className="grid grid-cols-3 gap-2 text-center md:flex md:flex-row md:justify-evenly content">
      {navBarContent.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `my-3 md:my-0 text-lg transition-all duration-500 ease-in-out 
            ${isActive ? "opacity-100 border-b-2 border-primary" : "opacity-60"}
            hover:opacity-100 hover:text-shadow-lg focus:outline-none focus:ring-2 focus:ring-primary`
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
  

  return (
    <>
      
      {/* 桌面版導覽列 */}
      <div className="flex flex-col md:flex  mt-2 mb-2 ">
        <NavBarContent />
      </div>
    
    </>
  );
}