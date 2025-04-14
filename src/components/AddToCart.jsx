import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCartItems } from "@/redux/cartSlice";
import { ShoppingBasket } from "lucide-react";
import '@/index.css';

export default function AddToCart({ products, qty }) {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const addToCart = () => {
    setShowToast(true); // 顯示 toast
    dispatch(addCartItems({
      id: products.id,
      name: products.name,
      image: products.image,
      price: products.price,
      countInStock: products.countInStock,
      qty,
    }))
    // 2 秒後自動關閉 toast
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <>
      <button className="btn btn-primary px-8 py-5" onClick={addToCart}>
        <ShoppingBasket strokeWidth={1} className="w-5 h-5 md:w-6 md:h-6 btext group-hover:scale-105 transition-transform" />
        <span className="font-thin ml-3 btext">加入購物車</span>
      </button>
      {showToast && (
        <div className="toast toast-end">
          <div className="alert">
            <span>
              {qty} {qty > 1 ? "pieces" : "piece"} 個 {products.name} {qty > 1 ? "have" : "has"} 已加入購物車
            </span>
          </div>
        </div>
      )}
    </>

  );
}