import { Link } from "react-router";
import CartSummary from "./CartSummary";

function Header() {
    return (
        /*桌面*/
        <header className="relative text-center flex flex-col items-center header">
            <Link to="/">
            <img className="w-full" src="/img/logo.svg" alt="logo" />
            </Link>
            <p className="text-gray-400 text-opacity-80 text-base leading-relaxed xl:w-1/2 lg:w-3/4 mx-auto">
                
            </p>
            /*colorswitch */
            <CartSummary/>
            <div className="flex mt-6 justify-center">
                <hr className="my-[25px] mx-auto w-[500px] border-0 border-t-[6px] border-cyan-200 opacity-100 rounded" />
            </div>
        </header>
        /*手機*/
    );
}

export default Header;