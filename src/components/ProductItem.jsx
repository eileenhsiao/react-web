/* eslint-disable react/prop-types */
import { Link } from 'react-router';
import _ from 'lodash';

function ProductItem({ product }) {
   return (
      <section className="pt-4 px-3 lg:px-4">
         <div className="border border-gray-500 rounded overflow-hidden">
            <Link to={`/products/id/${product.id}`}>
               <img className="w-full" src={product.image} alt={product.name} />
            </Link>
            <Link to={`/products/id/${product.id}`}>
            <div className="p-4">
               <h5 className="mb-3">
                  {product.name}
               </h5>         
            </div>
            </Link>
         </div>
      </section>
   );
}

export default ProductItem;