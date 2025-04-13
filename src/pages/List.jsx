import { useParams } from 'react-router';
import { Helmet } from "react-helmet-async"
import _ from 'lodash';
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ProductList from '@/components/ProductList'
import products from "@/json/products.json";
import NavBar from "@/components/NavBar";

function Category() {
  const { categoryName } = useParams();

const _products = products.filter(x =>
  (x.kind || []).map(k => k.toLowerCase()).includes(categoryName.toLowerCase())
);

const title = `商品列表 - ${_.startCase(categoryName)}`;

  return (
    <div>
      <div className="container mx-auto main-layout bg-gray-900 min-h-screen">
      <Helmet>
          <title>{title}</title>
        </Helmet>
      <Header/>
      <div style={{ marginTop: '100px', padding: '20px' }}></div>
        <NavBar />
        <ProductList products={_products} className="content" />
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default Category;
