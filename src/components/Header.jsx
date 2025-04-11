import { Link } from "react-router";
import CartSummary from "./CartSummary";
import NavBar from "@/components/NavBar"

function Header({ title, slogan }) {
    return (
        <header className="relative text-center flex flex-col items-center header">
            <Link to="/">
                <h2 className="text-white pt-5 pb-2 text-3xl font-bold">
                    {title}
                </h2>
            </Link>
            <p className="text-gray-400 text-opacity-80 text-base leading-relaxed xl:w-1/2 lg:w-3/4 mx-auto">
                {slogan}
            </p>
            <CartSummary/>
            <div className="flex mt-6 justify-center">
                <hr className="my-[25px] mx-auto w-[500px] border-0 border-t-[6px] border-cyan-200 opacity-100 rounded" />
            </div>
            <NavBar />
        </header>
    );
}

export default Header;