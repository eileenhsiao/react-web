import { useState } from "react";
import { useSelector } from "react-redux";
import BasketModal from "@/components/BasketModal"
import { selectCartItems } from "@/redux/cartSlice";
import { ShoppingCart } from "lucide-react";
import '@/index.css';

function CartSummary() {
   const [isOpen, setIsOpen] = useState(false);
   const cartItems = useSelector(selectCartItems);
   const count = (cartItems.length > 0) ?
      cartItems.reduce((sum, item) => sum + item.qty, 0)
      : 0;
   const toggleOpen = () => setIsOpen(!isOpen);

   return (
      <>
         <div
            onClick={toggleOpen}
            className="inline-flex items-center gap-x-1 cursor-pointer"
         >
            <div className="indicator relative">
            {count > 0 && <span className="indicator-item badge badge-primary text-white">{count}</span>}
               <ShoppingCart strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-105 transition-transform " />
            </div>
            
         </div>
         <BasketModal
            isOpen={isOpen}
            toggleModal={toggleOpen}
         />
      </>

   );
}

export default CartSummary;