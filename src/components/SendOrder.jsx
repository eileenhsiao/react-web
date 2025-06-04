import { useState } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems, removeCartItems, selectCartItems } from "@/redux/cartSlice";
import '@/index.css';


export default function SendOrderCard() {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const [shippingMethod, setShippingMethod] = useState("pickup");
    const shippingFee = shippingMethod === "home" ? 60 : 0;

    const getTotalPrice = () => {
        const itemsTotal = cartItems.length > 0
            ? cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
            : 0;
        return itemsTotal + shippingFee;
    };

    return (
        <div className="p-4 content w-[98%] mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* 左 電腦*/}
                <div className="hidden md:block">
                    <div className="text-xl font-semibold mb-6 font-bold bottom-border border-primary pb-2 ">訂單資訊</div>

                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id} className="grid grid-cols-[40px_100px_1fr_80px_100px_80px] items-center gap-2 border-b py-3">


                                <Link to={`/products/id/${item.id}?qtyFromBasket=${item.qty}`}>
                                    <img src={item.image} alt={item.name} className="w-[80px] h-[80px] object-cover mx-auto" />
                                </Link>

                                <div className="text-left">{item.name}</div>

                                <div className="text-sm">NT${item.price}</div>

                                <div>
                                    <select
                                        value={item.qty}
                                        onChange={(e) =>
                                            dispatch(addCartItems({
                                                ...item,
                                                qty: Number(e.target.value),
                                            }))
                                        }
                                        className="select select-bordered select-sm w-[4rem]"
                                    >
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="text-sm font-semibold">NT${item.price * item.qty}</div>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* 左 手機*/}
                <div className="md:hidden">
                    <div className="text-lg grid grid-cols-[2fr_180px__3fr_40px] items-center font-bold border-b-2 border-primary pb-2 mb-4">
                    </div>
                    <div className="text-xl font-semibold mb-6 font-bold bottom-border border-primary pb-2 ">訂單資訊</div>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id} className="grid grid-cols-[20px_4fr_8fr_4fr] items-center gap-2 border-b py-3">


                                <Link to={`/products/id/${item.id}?qtyFromBasket=${item.qty}`}>
                                    <img src={item.image} alt={item.name} className="w-[80px] h-[80px] object-cover mx-auto" />
                                </Link>
                                <div>
                                    <div className="text-sm text-left items-start h-[40px]">{item.name}</div>

                                    <div className="flex flex-row items-end">
                                        <div className="text-sm w-[50%] h-[30px]">NT${item.price} ×  </div>

                                        <div className="text-right w-[40%]">
                                            <select
                                                value={item.qty}
                                                onChange={(e) =>
                                                    dispatch(addCartItems({
                                                        ...item,
                                                        qty: Number(e.target.value),
                                                    }))
                                                }
                                                className="select select-bordered select-sm w-[3.5rem] "
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-sm font-semibold text-right">NT${item.price * item.qty}</div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 右 */}
                <div className="md:pl-4 md:border-l-2 md:border-primary md:flex md:flex-col md:justify-between md:h-full">
                    <div className="text-xl font-semibold mb-6 font-bold bottom-border border-primary pb-2 ">購物車總計</div>
                    <div>


                        <div className="flex justify-between font-semibold mt-4">
                            <span>共項</span>
                        </div>

                        <div className="flex justify-between font-semibold mt-4">
                            <span>總計</span>
                            <span>NT${getTotalPrice()}</span>
                        </div>
                    </div>

                    <Link to="/">
                        <button className="w-full bg-primary text-white py-3 rounded mt-6 ">
                            回首頁
                        </button>
                    </Link>
                    <Link to="/profile?key=2">
                        <button className="w-full bg-primary text-white py-3 rounded mt-6 ">
                            查看訂單
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
}
