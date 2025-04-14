import { useState } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems, removeCartItems, selectCartItems } from "@/redux/cartSlice";
import '@/index.css';

export default function CartList() {
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
        <div className="p-4 content">
            {cartItems.length === 0 ? (
                <div className="text-center text-2xl">購物車是空的</div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {/* 左 */}
                    <div>
<<<<<<< HEAD
                        <div className="grid grid-cols-[40px_100px_1fr_80px_100px_80px] items-center font-bold border-b-2 border-primary pb-2 mb-4">
=======
                        <div className="grid grid-cols-[40px_40px_1fr_80px_100px_80px] items-center font-bold border-b border-[#d4b180] pb-2 mb-4">
>>>>>>> 6dfe69915aa7bd9981d034eb393368c105d21ea6
                            <div></div>
                            <div></div>
                            <div>商品</div>
                            <div>價格</div>
                            <div>數量</div>
                            <div>小計</div>
                        </div>

                        <ul>
                            {cartItems.map(item => (
                                <li key={item.id} className="grid grid-cols-[40px_100px_1fr_80px_100px_80px] items-center gap-2 border-b py-3">
                                    <div className="text-xl cursor-pointer ml-5" onClick={() => dispatch(removeCartItems(item.id))}>x</div>

                                    <Link to={`/products/id/${item.id}?qtyFromBasket=${item.qty}`}>
                                        <img src={item.image} alt={item.name} className="w-[80px] h-[80px] object-cover mx-auto" />
                                    </Link>

                                    <div className="text-left">{item.name}</div>

                                    <div className="text-sm">NT${item.price}</div>

                                    <div>
                                        <select
                                            defaultValue={item.qty}
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

                    {/* 右 */}
<<<<<<< HEAD
                    <div className="p-4 border-l-2 border-primary flex flex-col justify-between">
=======
                    <div className="p-4 border-l-2 border-[#d4b180] flex flex-col justify-between h-full">
                    <div className="text-xl font-semibold mb-6 font-bold border-b border-[#d4b180]">購物車總計</div>
>>>>>>> 6dfe69915aa7bd9981d034eb393368c105d21ea6
                        <div>
                            

                            <div className="flex justify-between mb-2">
                                <span>小計</span>
                                <span>NT${cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)}</span>
                            </div>

                            <div className="mb-2 flex justify-between items-center">
                                <span className="whitespace-nowrap">出貨方式：</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShippingMethod("pickup")}
<<<<<<< HEAD
                                        className={`border px-3 py-1 rounded text-sm ${
                                            shippingMethod === "pickup"
                                                ? "bg-primary btext border"
                                                : "border"
                                        }`}
=======
                                        className={`border px-3 py-1 rounded text-sm ${shippingMethod === "pickup"
                                            ? "bg-[#d4b180] text-white border-[#d4b180]"
                                            : "border-gray-400"
                                            }`}
>>>>>>> 6dfe69915aa7bd9981d034eb393368c105d21ea6
                                    >
                                        自取 <span className="text-xs ml-1">(運費+0)</span>
                                    </button>
                                    <button
                                        onClick={() => setShippingMethod("home")}
<<<<<<< HEAD
                                        className={`border px-3 py-1 rounded text-sm ${
                                            shippingMethod === "home"
                                                ? "bg-primary btext border"
                                                : "border"
                                        }`}
=======
                                        className={`border px-3 py-1 rounded text-sm ${shippingMethod === "home"
                                            ? "bg-[#d4b180] text-white border-[#d4b180]"
                                            : "border-gray-400"
                                            }`}
>>>>>>> 6dfe69915aa7bd9981d034eb393368c105d21ea6
                                    >
                                        宅配 <span className="text-xs ml-1">(運費+60)</span>
                                    </button>
                                </div>
                            </div>
                            <div></div>
                            <div className="flex justify-between font-semibold mt-4">
                                <span>總計</span>
                                <span>NT${getTotalPrice()}</span>
                            </div>
                        </div>

                        <button className="w-full bg-primary text-white py-3 rounded mt-6 ">
                            結帳
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
