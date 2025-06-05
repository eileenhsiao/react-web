import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddToCart from "@/components/AddToCart"
import '@/index.css';
import { toggleFollow, selectFollowedItems } from "../redux/followSlice";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { db } from "../api"; // 根據你的檔案位置調整
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { useUserInfo } from "../react-query";

function ProductDetail({ product }) {
  const { data: userInfo } = useUserInfo();

  const handleToggleFollow = async () => {
    if (!userInfo?.uid) {
      alert("請先登入才能收藏商品！");
      return;
    }

    const followRef = doc(db, "users", userInfo.uid, "follows", String(product.id));


    try {
      if (isFollowed) {
        // 已收藏 → 要取消收藏
        await deleteDoc(followRef);
      } else {
        // 未收藏 → 要加入收藏
        await setDoc(followRef, {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          createdAt: new Date(),
        });
      }
      dispatch(toggleFollow(product));
    } catch (error) {
      console.error("更新收藏狀態失敗：", error);
    }
  };

  const [qty, setQty] = useState(product.countInStock > 0 ? 1 : 0);
  const dispatch = useDispatch();
  const followedItems = useSelector(selectFollowedItems);
  const isFollowed = followedItems.some(item => item.id === product.id);

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
      <div className="md:col-span-8 md:col-start-12 px-4 md:m-0 m-3">
        <h2 className="opacity-60 mb-1 text-lg">{product.category}</h2>
        <h1 className="text-xl md:text-2xl font-bold mb-2x bottom-border inline-block mb-3">{product.name}</h1>
        <p className="text-s md:text-base c-text mb-4 leading-relaxed">
          {product.intro.split('\n').map((line, idx) => (
            <span key={idx}>
              {line}
              <br />
            </span>
          ))}
        </p>

        {/* 價格與按鈕 */}
        <div className="flex flex-col gap-4">
          <p className="text-xl md:text-2xl font-semibold">TWD {product.price}元</p>
          <div className="flex items-center gap-2">
            <span className="font-bold" >數量：</span>
            <select
              className="select select-bordered w-20"
              defaultValue={product.countInStock > 0 ? 1 : 0}
              onChange={event => setQty(Number(event.target.value))}
            >
              {[...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>
          <p>
            <span className="font-bold">總價：</span>{product.price * qty}
          </p>
          <div className="grid grid-cols-[1fr_10fr] items-center items-center gap-6 w-full mt-2">

            <button
              onClick={handleToggleFollow}
              aria-label="收藏商品"
              className="heart-button text-3xl"
            >
              {isFollowed ? (
                <HeartFilled className="heart-filled" />
              ) : (
                <HeartOutlined className="heart-outlined transition-transform hover:scale-110" />
              )}
            </button>

            {/* 加入購物車，寬度可以自訂，這裡用 flex-grow 讓他變寬 */}
            <div className="button1 text-center rounded">
              <AddToCart products={product} qty={qty} />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-10px md:mb-0px"></div>
      <div className="mb-10px md:mb-0px"></div>
    </div>
  );
}

export default ProductDetail;