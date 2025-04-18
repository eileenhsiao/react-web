import ProductItem from '@/components/ProductItem';
import { Link } from "react-router";
import '@/index.css';

function PopularList({ products }) {
   return (
      <div className="w-full content mt-10 text-center">
         <h1 className="text-2xl  font-bold mb-10 bottom-border inline-block mx-auto">熱門商品</h1>

         <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-8 md:px-4">
            {products.slice(0, 6).map((product) => (
               <ProductItem key={product.id} product={product} />
            ))}
         </div>

         <div className="flex justify-center mt-8">
            <Link
            to="/products/list/all"
            className="btn btn-primary flex items-center justify-center px-8 py-5 mb-20"
            >
            <span className="btext">查看全部商品</span>
            </Link>
         </div>
      </div>
   );
}

export default PopularList;
