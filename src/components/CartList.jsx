import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems, removeCartItems, selectCartItems } from "@/redux/cartSlice";
import { ShoppingBasket } from "lucide-react";
import '@/index.css';

export default function CartList() {
   const dispatch = useDispatch();
   const cartItems = useSelector(selectCartItems);

   const getTotalPrice = () => {
      return cartItems.length > 0
         ? cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
         : 0;
   };

   return (
      <div className="p-4 text-[#333]">
         {cartItems.length === 0 ? (
            <div className="text-center">購物車是空的</div>
         ) : (
            <>
               {/* 表頭 */}
               <div className="grid grid-cols-[40px_80px_1fr_80px_100px_80px] items-center font-bold border-b border-[#d4b180] pb-2 mb-4">
                  <div></div>
                  <div></div>
                  <div>商品</div>
                  <div>價格</div>
                  <div>數量</div>
                  <div>小計</div>
               </div>

               {/* 商品列表 */}
               <ul>
                  {cartItems.map(item => (
                     <li
                        key={item.id}
                        className="grid grid-cols-[40px_80px_1fr_80px_100px_80px] items-center mb-4 pb-4 border-b border-gray-200"
                     >
                        {/* 刪除按鈕 */}
                        <div
                           className="text-xl text-gray-500 cursor-pointer"
                           onClick={() => dispatch(removeCartItems(item.id))}
                        >
                           x
                        </div>

                        {/* 商品圖片 */}
                        <Link to={`/products/id/${item.id}?qtyFromBasket=${item.qty}`}>
                           <img
                              src={item.image}
                              alt={item.name}
                              className="w-[80px] h-[80px] object-cover rounded cursor-pointer"
                           />
                        </Link>

                        {/* 商品名稱 */}
                        <div className="ml-2">{item.name}</div>

                        {/* 單價 */}
                        <div className="text-sm">NT${item.price}</div>

                        {/* 數量選單 */}
                        <div>
                           <select
                              defaultValue={item.qty}
                              onChange={(e) =>
                                 dispatch(addCartItems({
                                    id: item.id,
                                    name: item.name,
                                    image: item.image,
                                    price: item.price,
                                    countInStock: item.countInStock,
                                    qty: Number(e.target.value),
                                 }))
                              }
                              className="border border-gray-300 rounded px-2 py-1"
                           >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                 <option key={x + 1} value={x + 1}>{x + 1}</option>
                              ))}
                           </select>
                        </div>

                        {/* 小計 */}
                        <div className="text-sm font-medium">NT${item.price * item.qty}</div>
                     </li>
                  ))}
               </ul>

               {/* 總結區塊 */}
               <div className="mt-8 p-4 border-l-2 border-[#d4b180]">
                  <h2 className="text-xl font-semibold mb-4">購物車總計</h2>

                  <div className="flex justify-between mb-2">
                     <span>小計</span>
                     <span>NT${getTotalPrice()}</span>
                  </div>

                  <div className="mb-2">
                     <span className="block mb-1">出貨方式</span>
                     <button className="border border-gray-400 px-3 py-1 rounded text-sm">
                        自取 <span className="text-xs ml-1">(運費+0)</span>
                     </button>
                  </div>

                  <div className="flex justify-between font-semibold mt-4">
                     <span>總計</span>
                     <span>NT${getTotalPrice()}</span>
                  </div>

                  <button
                     className="w-full bg-[#d4b180] text-white py-3 rounded mt-6 hover:opacity-90"
                  >
                     結帳
                  </button>
               </div>
            </>
         )}
      </div>
   );
}
