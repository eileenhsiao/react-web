import { useState } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems, removeCartItems, selectCartItems } from "@/redux/cartSlice";
import '@/index.css';
import { selectShippingAddress, selectShippingMethod } from "@/redux/cartSlice";

import { useLocation } from "react-router-dom";
export default function SendOrderCard() {
    const dispatch = useDispatch();
    //const cartItems = useSelector(selectCartItems);
    const location = useLocation();
    const tempCartItems = location.state?.cartItems || [];

    const cartItems = tempCartItems;
    const [shippingMethod, setShippingMethod] = useState("pickup");
    const shippingFee = shippingMethod === "home" ? 60 : 0;

    const getTotalPrice = () => {
        const itemsTotal = cartItems.length > 0
            ? cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
            : 0;
        return itemsTotal + shippingFee;
    };
    const getTotalQuantity = () => {
        return cartItems.reduce((sum, item) => sum + item.qty, 0);
    };
    const shippingAddress = useSelector(selectShippingAddress);
    
   
    

    return (
        
        <div className="p-4 content max-w-4xl mx-auto pfcard px-6 py-8 ">

            <div className="flex flex-col gap-8">

                {/* 左 電腦*/}
                <div className="hidden md:block">
                    <div className="text-xl font-semibold mb-6 font-bold bottom-border border-primary pb-2 ">訂單資訊</div>
                    <div className=" p-4 mb-6">
                        
                        <p>訂單編號：#{Math.floor(100000 + Math.random() * 900000)}</p>
                        <p>訂購日期：{new Date().toLocaleDateString()}</p>
                        <p>付款方式：信用卡</p>
                        <p>取貨方式：{shippingMethod === "home" ? "宅配" : "自取"}</p>

                        {shippingMethod === "home" ? (
                            <div className="mt-2">
                            <p>地址：{shippingAddress?.postalCode} {shippingAddress?.city} {shippingAddress?.district} {shippingAddress?.addressDetail}</p>
                            <p>收件人：{shippingAddress?.fullName}（{shippingAddress?.phonenumber}）</p>
                            </div>
                        ) : (
                            <div className="mt-2">
                            <p>取貨店鋪：{shippingAddress?.pickupShop}</p>
                            <p>取貨時間：{shippingAddress?.pickupDate?.format?.("YYYY-MM-DD") || shippingAddress?.pickupDate} {shippingAddress?.pickupTime}</p>
                            <p>收件人：{shippingAddress?.fullName}（{shippingAddress?.phonenumber}）</p>
                            </div>
                        )}
                        </div>

                   
                </div>
                {/* 左 手機*/}
                <div className="md:hidden">
                    <div className="text-lg grid grid-cols-[2fr_180px__3fr_40px] items-center font-bold border-b-2 border-primary pb-2 mb-4">
                    </div>
                    <div className="text-xl font-semibold mb-6 font-bold bottom-border border-primary pb-2 ">訂單資訊</div>
                    <div className=" p-4 mb-6 ">
                        
                        <p>訂單編號：#{Math.floor(100000 + Math.random() * 900000)}</p>
                        <p>訂購日期：{new Date().toLocaleDateString()}</p>
                        <p>付款方式：信用卡</p>
                        <p>取貨方式：{shippingMethod === "home" ? "宅配" : "自取"}</p>

                        {shippingMethod === "home" ? (
                            <div className="mt-2">
                            <p>地址：{shippingAddress?.postalCode} {shippingAddress?.city} {shippingAddress?.district} {shippingAddress?.addressDetail}</p>
                            <p>收件人：{shippingAddress?.fullName}（{shippingAddress?.phonenumber}）</p>
                            </div>
                        ) : (
                            <div className="mt-2">
                            <p>取貨店鋪：{shippingAddress?.pickupShop}</p>
                            <p>取貨時間：{shippingAddress?.pickupDate?.format?.("YYYY-MM-DD") || shippingAddress?.pickupDate} {shippingAddress?.pickupTime}</p>
                            <p>收件人：{shippingAddress?.fullName}（{shippingAddress?.phonenumber}）</p>
                            </div>
                        )}
                        </div>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id} className="grid grid-cols-[20px_4fr_8fr_4fr] items-center gap-2 border-b py-3">


                                <Link to={`/products/id/${item.id}?qtyFromBasket=${item.qty}`}>
                                    <img src={item.image} alt={item.name} className="w-[80px] h-[80px] object-cover mx-auto" />
                                </Link>
                                <div>
                                    <div className="text-sm text-left items-start h-[40px]">{item.name}</div>

                                    <div className="flex flex-row items-end">
                                        <div className="text-right w-[40%]">
                                            <div className="text-sm font-medium px-2 py-1 border rounded w-[3.5rem] text-center">
                                                {item.qty}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-sm font-semibold text-right">NT${item.price * item.qty}</div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 右 */}
                <div className="md:pl-4   md:flex md:flex-col md:justify-between md:h-full">
                    <div className="text-xl font-semibold mb-6 font-bold bottom-border border-primary pb-2 ">購物車總計</div>
                     <ul>
                        {cartItems.map(item => (
                            <li key={item.id} className="grid grid-cols-[100px_1fr_80px_100px_80px] items-center gap-2 border-b py-3">
                                

                                <Link to={`/products/id/${item.id}?qtyFromBasket=${item.qty}`}>
                                    <img src={item.image} alt={item.name} className="w-[80px] h-[80px] object-cover mx-auto" />
                                </Link>

                                <div className="text-left">{item.name}</div>

                                <div>
                                    <div className="text-sm font-medium px-2 py-1  text-center">
                                        × {item.qty}
                                    </div>
                                </div>

                                <div className="text-sm font-semibold">NT${item.price * item.qty}</div>
                            </li>
                        ))}
                    </ul>
                    
                    <div>


                       

                        <div className="flex justify-between font-semibold mt-4">
                            <span>共 {getTotalQuantity()} 項</span>
                            <div>
                            <span>總計</span>
                            <span>NT${getTotalPrice()}</span>
                            </div>
                        </div>
                    </div>

                   <div className="mt-6 flex flex-col md:flex-row gap-4 md:justify-end md:items-center">
                    <Link to="/" className="w-full md:w-auto">
                        <button className="px-6  py-2 button2 rounded font-semibold hover:bg-primary hover:text-white transition">
                        回首頁
                        </button>
                    </Link>
                    <Link to="/profile?key=2" className="w-full md:w-auto">
                        <button className="px-6 py-2 button1 font-semibold  rounded hover:opacity-90 transition">
                        查看訂單
                        </button>
                    </Link>
                    </div>


                </div>
            </div>

        </div>
    );
}
