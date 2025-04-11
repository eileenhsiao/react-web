import { Link } from "react-router";
import CartSummary from "./CartSummary";

function Header() {
    return (
        <header className="relative text-center flex flex-col items-center header">
            <Link to="/">
            <img className="w-full" src="/img/icon.svg" alt="icon" />
            </Link>
            <p className="text-gray-400 text-opacity-80 text-base leading-relaxed xl:w-1/2 lg:w-3/4 mx-auto">
                
            </p>
            /*colorswitch */
            <CartSummary/>
            <div className="flex mt-6 justify-center">
                <hr className="my-[25px] mx-auto w-[500px] border-0 border-t-[6px] border-cyan-200 opacity-100 rounded" />
            </div>
            
        </header>
    );
}

export default Header;