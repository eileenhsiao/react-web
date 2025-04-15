import { useParams } from 'react-router';
import { Helmet } from "react-helmet-async"
import _ from 'lodash';
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ProductList from '@/components/ProductList'
import products from "@/json/products.json";
import NavBar from "@/components/NavBar";
import { useEffect } from 'react';

function Category() {
  const { categoryName } = useParams();

const _products = products.filter(x =>
  (x.kind || []).map(k => k.toLowerCase()).includes(categoryName.toLowerCase())
);

const title = `商品列表 - ${_.startCase(categoryName)}`;

useEffect(() => {
  window.scrollTo(0, 0); // 滾動到頁面頂部
}, []);

  return (
    <div>
      <div className="container mx-auto main-layout min-h-screen">
      <Helmet>
          <title>{title}</title>
        </Helmet>
      <Header/>
      <div className="mt-[40px] md:mt-[100px] p-0">
        <NavBar />
        <ProductList products={_products} className="content" />
      </div>
        
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default Category;
