import { Link } from "react-router";
import { useState } from 'react';
import CartSummary from "./CartSummary";
import './style.css';
import HamMenu from '@/components/HamMenu';
import SetColorMode from "@/components/SetColorMode";
import '@/index.css';
import { useSelector } from "react-redux";
import { selectLightMode } from "@/redux/colorSlice";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false); // 控制側邊選單顯示
    const lightMode = useSelector(selectLightMode);

    return (
        <>
            {/* 手機版漢堡選單 */}
            <div className="drawer md:hidden">
                {/* 漢堡選單 */}
                <div className="drawer-content flex items-center justify-between px-4 py-3 relative">
                    <label htmlFor="drawer-toggle" className="z-10">
                        <HamMenu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
                    </label>

                    {/* LOGO */}
                    <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
                        <img
                            src={lightMode ? "/img/logo.svg" : "/img/logodark.svg"}
                            alt="logo"
                            className="h-6"
                        />
                    </Link>

                    {/* 右側：亮暗模式和購物車按鈕 */}
                    <div className="flex flex-col items-end gap-2">
                        <SetColorMode />
                        <CartSummary />
                    </div>
                </div>

                {/* 側邊選單 */}
                <div className={`drawer-side z-50 ${isOpen ? 'block' : 'hidden'} transition-all duration-300`}>
                    <label htmlFor="drawer-toggle" className="drawer-overlay" onClick={() => setIsOpen(false)}></label>
                    <ul className="menu p-4 w-64 min-h-full bg-base-100 text-base-content">
                        <li><Link to="/about">關於我們</Link></li>
                        <li><Link to="/products/list/all">商品列表</Link></li>
                    </ul>
                </div>
            </div>

            {/* 桌面版 Header */}
            <header className="hidden md:block relative text-center f header sticky-header">
                <div className="flex items-center justify-between px-4 py-2">
                    {/* 左側：logo */}
                    <Link to="/">
                        <img
                            src={lightMode ? "/img/logo.svg" : "/img/logodark.svg"}
                            alt="logo"
                            className="h-6"
                        />
                    </Link>

                    {/* 右側：導航、亮暗模式和購物車 */}
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
