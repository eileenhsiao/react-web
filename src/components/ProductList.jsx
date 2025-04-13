import ProductItem from '@/components/ProductItem';

function ProductList({ products }) {
   return (
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
      {products.map((product) => (

         <ProductItem key={product.id} product={product} />
      ))}
      </div>
   );
}

export default ProductList;