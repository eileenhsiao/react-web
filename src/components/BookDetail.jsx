import AddToBasket from "@/components/AddToCart"
import { useState } from "react";

function BookDetail({ book }) {
  const [qty, setQty] = useState(book.stock > 0 ? 1 : 0);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-24 gap-8 justify-center">
      {/* 左側：產品圖片（佔6/24） */}
      <div className="lg:col-span-6 lg:col-start-3">
        <img
          alt={book.title}
          className="w-full h-96 object-cover object-center rounded-md"
          src={book.cover}
        />
      </div>

      {/* 右側：產品資訊（佔14/24） */}
      <div className="lg:col-span-14 px-4">
        <h2 className="text-white opacity-40 mb-1 text-lg">{book.author}</h2>
        <h1 className="text-white text-2xl font-bold mb-2">{book.title}</h1>
        <p className="text-white opacity-60 text-base mb-4">{book.summary}</p>

        {/* 價格與按鈕 */}
        <div className="flex flex-col gap-4">
          <p className="text-white text-2xl font-semibold">US${book.price}.00</p>
          <p>
            <span className="text-white font-bold" >Status</span>: {book.stock > 0 ? "In Stock" : "Unavailable."}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold" >Qty:</span>
            <select
              className="select select-bordered w-20"
              defaultValue={book.stock > 0 ? 1 : 0}
              onChange={ event => setQty(event.target.value)}
            >
              {[ ...Array(book.stock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>
          <p>
            <span className="text-white font-bold">Total Price: {book.price * qty}</span>
          </p>
          <AddToBasket book={book} qty={Number(qty)}/>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;