import { NavLink } from 'react-router';
import { useState } from 'react';
import HamMenu from '@/components/HamMenu';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navBarContent = [
    { to: "/books/category/SocialCriticism_Dystopia", label: "Social Criticism & Dystopia" },
    { to: "/books/category/Romance_Society", label: "Romance & Society" },
    { to: "/books/category/Coming-of-Age_Obsession", label: "Coming-of-Age & Obsession" }
  ];  

  const NavBarContent = () => (
    <div className="flex flex-col md:flex-row md:justify-around md:space-x-6">
      {navBarContent.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `my-3 md:my-0 text-lg transition-all duration-500 ease-in-out ${isActive ? " opacity-100" : "opacity-60"
            } hover:opacity-100 hover:text-shadow-lg`
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center">
      {navBarContent.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `mx-6 text-white text-base transition-all duration-500 ease-in-out ${
              isActive ? "opacity-100 font-normal" : "opacity-60"
            } hover:opacity-100 hover:[text-shadow:0px_0px_30px_white]`
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
}