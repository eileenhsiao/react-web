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
        <div >
        <div className="content max-w-sm md:max-w-4xl mx-auto px-6 py-8 ">
            <div className="flex items-center justify-center gap-8 mb-20 text-sm text-primary font-semibold">
                        {/* 步驟 1 */}
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center">1</div>
                            <div className="mt-2 text-md md:text-xl">確認訂單</div>
                        </div>

                        {/* 線 */}
                        <div className="flex-1 h-[1px] bg-primary max-w-[60px] mb-7"></div>

                        {/* 步驟 2 */}
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full border-2 border-primary text-primary flex items-center justify-center">2</div>
                            <div className="mt-2 text-md md:text-xl">填寫資料</div>
                        </div>

                        {/* 線 */}
                        <div className="flex-1 h-[1px] bg-primary max-w-[60px] mb-7"></div>

                        {/* 步驟 3 */}
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-primary text-white text-primary flex items-center justify-center">3</div>
                            <div className="mt-2 text-md md:text-xl">送出訂單</div>
                        </div>
                        </div>
            <div className="p-4 flex flex-col gap-8 pfcard ">

                {/* 左 電腦*/}
                <div >
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
                            <p>收件人：{shippingAddress?.name}（{shippingAddress?.tel}）</p>
                            </div>
                        )}
                        </div>

                   
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

               
            </div>
            </div>
            <div className="mt-6 flex flex-col md:flex-row gap-4 w-full md:justify-end">
            <Link to="/" className="w-full md:w-auto">
                <button className="w-full md:w-auto text-sm md:text-base px-6 py-2 button2 rounded font-semibold hover:bg-primary hover:text-white transition">
                回首頁
                </button>
            </Link>
            <Link to="/profile?key=2" className="w-full md:w-auto">
                <button className="w-full md:w-auto text-sm md:text-base px-6 py-2 button1 rounded font-semibold hover:opacity-90 transition">
                查看訂單
                </button>
            </Link>
            </div>

        </div>
        </div>
    );
}
