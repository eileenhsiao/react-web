import ProductItem from '@/components/ProductItem';

function ProductList({ products }) {
   return (
      <div className="w-full content mt-10">
         <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 ">
            {products.map((product) => (
               <ProductItem key={product.id} product={product} />
            ))}
         </div>
      </div>
   );
}

export default ProductList;