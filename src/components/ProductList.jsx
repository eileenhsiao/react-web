import ProductItem from '@/components/ProductItem';

function ProductList({ products }) {
   return (
      <div className="w-full content mt-10">
         <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-8 md:px-4 mb-20">
            {products.map((product) => (
               <ProductItem key={product.id} product={product} />
            ))}
         </div>
      </div>
   );
}

export default ProductList;