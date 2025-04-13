import { Link } from "react-router";
import { NavLink } from 'react-router';
import { useState } from 'react';
import CartSummary from "./CartSummary";
import './style.css';
import HamMenu from '@/components/HamMenu';
import SetColorMode from "@/components/SetColorMode";
import '@/index.css';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);



    return (
        <>
            {/* 手機顯示HamMenu */}
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
                        <Link to="/">首頁</Link>

                        <Link to="/about">關於我們</Link>
                        <Link to="/list">商品列表</Link>
                    </div>
                </div>
            </div>
            {/*桌面*/}
            <header className="relative text-center f header sticky-header">
                <div className="flex items-center justify-between px-4 py-2">
                    {/* 左邊的 logo */}
                    <Link to="/">
                        <img className="h-6" src="/img/logo.svg" alt="logo" />
                    </Link>

                    {/* 右邊的導航區塊 */}
                    <div className="flex items-center gap-x-6">
                        <Link to="/about">關於我們</Link>
                        <Link to="/products/list/all">商品列表</Link>
                        <SetColorMode />
                        <CartSummary />
                    </div>
                </div>
            </header>


        </>
    );
}