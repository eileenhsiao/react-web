import { Link } from "react-router";
import { NavLink } from 'react-router';
import { useState } from 'react';
import CartSummary from "./CartSummary";
import './style.css';
import HamMenu from '@/components/HamMenu';
import SetColorMode from "@/components/SetColorMode";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);



    return (
        <>
        {/* HamMenu */}
        <div className="drawer md:hidden">
                <input id="drawer-toggle" type="checkbox" className="drawer-toggle" checked={isOpen} readOnly />
                <HamMenu
                    id="drawer-toggle"
                    className="absolute transform -translate-y-37 translate-x-1 drawer-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    isOpen={isOpen}
                />
                <div className="drawer-side z-9999">
                    <label htmlFor="drawer-toggle" className="drawer-overlay" onClick={() => setIsOpen(false)}></label>
                    <div className="menu p-4 w-64 min-h-full drawer-bg">
                        <p>首頁</p>
                        <p>關於我們</p>
                        <p>商品列表</p>
                    </div>
                </div>
            </div>
            {/*桌面*/}
            <header className="relative text-center flex flex-col items-center header sticky-header">
                <Link to="/">
                    <img className="w-full" src="/img/logo.svg" alt="logo" />
                </Link>
                <Link to="/">
                    <p>關於我們</p>
                </Link>
                <Link to="/">
                    <p>商品列表</p>
                </Link>
                <SetColorMode />
                <CartSummary />
            </header>

            
        </>
    );
}