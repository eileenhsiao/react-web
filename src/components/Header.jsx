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
            <div className="drawer md:hidden header shadow-md">
                {/* 漢堡選單 */}
                <div className="drawer-content flex items-center justify-between px-4 py-3 relative">
                    <button onClick={() => setIsOpen(!isOpen)} className="z-60">
                        <HamMenu isOpen={isOpen} />
                    </button>

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
                {isOpen && (
                    <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />
                )}
                {/* 側邊選單 */}
                <div className={`text-xl fixed top-0 left-0 h-full w-64 pt-15 header z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <ul className="p-4">
                        <li className="mb-3"><Link to="/" onClick={() => setIsOpen(false)}>首頁</Link></li>
                        <li className="mb-3"><Link to="/about" onClick={() => setIsOpen(false)}>關於我們</Link></li>
                        <li className="mb-3"><Link to="/products/list/all" onClick={() => setIsOpen(false)}>商品列表</Link></li>
                    </ul>
                </div>
            </div>

            {/* 桌面版 Header */}
            <header className="container mx-auto hidden md:block relative text-center header sticky-header">
                <div className="container mx-auto flex items-center justify-between px-4 py-2">
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
