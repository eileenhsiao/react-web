import ProductItem from '@/components/ProductItem';

function PopularList({ products }) {
   return (
      <div className="w-full content mt-10">
         <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {products.slice(0, 6).map((product) => (
               <ProductItem key={product.id} product={product} />
            ))}
         </div>
      </div>
   );
}

export default PopularList;
