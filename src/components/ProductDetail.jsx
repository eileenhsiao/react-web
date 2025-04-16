import { useState } from "react";
import AddToCart from "@/components/AddToCart"
import '@/index.css';

function ProductDetail({ product }) {

  const [qty, setQty] = useState(product.countInStock > 0 ? 1 : 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-24 gap-8 justify-center content md:mb-30 mt-10 md:mt-0">
      {/* 左側：產品圖片（佔6/24） */}
      <div className="md:col-span-6 md:col-start-6">
        <img
          alt={product.name}
          className="mx-auto w-[60%] md:w-full md:h-96 object-cover object-center rounded-sm md:rounded-md "
          src={product.image}
        />
      </div>

      {/* 右側：產品資訊（佔14/24） */}
      <div className="md:col-span-8 md:col-start-12 px-4">
        <h2 className="opacity-60 mb-1 text-lg">{product.category}</h2>
        <h1 className="text-2xl font-bold mb-2x bottom-border inline-block mb-3">{product.name}</h1>
        <p className=" c-text mb-4 leading-relaxed">
          {product.intro.split('\n').map((line, idx) => (
            <span key={idx}>
              {line}
              <br />
            </span>
          ))}
        </p>

        {/* 價格與按鈕 */}
        <div className="flex flex-col gap-4">
          <p className="text-2xl font-semibold">TWD {product.price}元</p>
          <div className="flex items-center gap-2">
            <span className="font-bold" >數量:</span>
            <select
              className="select select-bordered w-20"
              defaultValue={product.countInStock > 0 ? 1 : 0}
              onChange={ event => setQty(Number(event.target.value))}
            >
              {[ ...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>
          <p>
            <span className="font-bold">總價:</span>: {product.price * qty}
          </p>
          <AddToCart products={product} qty={qty} />
        </div>
      </div>
      <div className="mb-10px md:mb-0px"></div>
      <div className="mb-10px md:mb-0px"></div>
    </div>
  );
}

export default ProductDetail;