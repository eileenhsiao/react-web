import { useParams } from 'react-router';
import { Helmet } from "react-helmet-async"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ProductDetail from "@/components/ProductDetail";
import products from "@/json/products.json";
import _ from 'lodash';


function Product() {
   const { productId } = useParams();
   const product = products.find((x) => x.id === Number(productId));
   console.log(productId, product);
   const title = product ? _.startCase(product.name) : '商品詳細';
   return (
      <div className="container mx-auto main-layout bg-gray-900">
         <Helmet>
               <title>{title}</title>
            </Helmet>
            <Header/>
            <div style={{ marginTop: '100px', padding: '20px' }}></div>
         
            <ProductDetail product={product} className="content" />
         <Footer className="footer" />
      </div>
      
   );
   
}

export default Product;
