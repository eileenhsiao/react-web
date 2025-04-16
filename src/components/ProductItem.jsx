/* eslint-disable react/prop-types */
import { Link } from 'react-router';
import _ from 'lodash';
import '@/index.css';

function ProductItem({ product }) {
   return (
      <section className="w-full max-w-[280px] mx-auto pt-4 px-3 lg:px-4 ">
         <div className="custom-border overflow-hidden pbox">
            <Link to={`/products/id/${product.id}`}>
               <img className="w-full max-w-[250px] mx-auto " src={product.image} alt={product.name} />
            </Link>
            <Link to={`/products/id/${product.id}`}>
            <div className="p-2">
               <h5 className="mb-1 text-center c-text text-xs md:text-base">
                  {product.name}
               </h5>         
            </div>
            </Link>
         </div>
      </section>
   );
}

export default ProductItem;