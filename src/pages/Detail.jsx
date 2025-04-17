import { useParams } from 'react-router';
import { Helmet } from "react-helmet-async"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ProductDetail from "@/components/ProductDetail";
import products from "@/json/products.json";
import _ from 'lodash';
import { useEffect } from 'react';


function Product() {
   useEffect(() => {
      window.scrollTo(0, 0); // 滾動到頁面頂部
    }, []);
    
   const { productId } = useParams();
   const product = products.find((x) => x.id === Number(productId));
   console.log(productId, product);
   const title = product ? _.startCase(product.name) : '商品詳細';
   return (
      <div className="container mx-auto main-layout">
         <Helmet>
               <title>{title}</title>
            </Helmet>
            <Header/>
            <div className="mt-[0px] p-10 md:mt-[40px] md:p-20"></div>
         
            <ProductDetail product={product} className="content" />
         <Footer className="footer" />
      </div>
      
   );
   
}

export default Product;
