import { useEffect, useState } from "react";
import { useUserInfo } from "../react-query";
import { Spin, Empty, message } from "antd";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../api";
import { HeartFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "@/index.css";
import { useDispatch } from "react-redux";
import { toggleFollow } from "../redux/followSlice";

export default function FavoritesTab() {
  const { data: userInfo, isLoading: userLoading } = useUserInfo();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userInfo?.uid) return;

      setLoading(true);
      try {
        const followRef = collection(db, "users", userInfo.uid, "follows");
        const querySnapshot = await getDocs(followRef);
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFavoriteProducts(products);
      } catch (error) {
        console.error("載入收藏商品失敗：", error);
        setFavoriteProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (!userLoading && userInfo) {
      fetchFavorites();
    }
  }, [userInfo, userLoading]);

  const handleUnfollow = async (product, index) => {
  if (!userInfo?.uid) return;

  try {
    const followDocRef = doc(db, "users", userInfo.uid, "follows", String(product.id));
    await deleteDoc(followDocRef);

    setFavoriteProducts((prev) => prev.filter((_, i) => i !== index));
    setDeletedItems((prev) => [...prev, { product, index }]);
    dispatch(toggleFollow(product)); // <== 加上這行！
    message.success("已取消收藏");

    // 自動 5 秒後移除提示
    setTimeout(() => {
      setDeletedItems((prev) =>
        prev.filter((item) => item.product.id !== product.id)
      );
    }, 5000);
  } catch (error) {
    console.error("取消收藏失敗：", error);
    message.error("取消收藏失敗");
  }
};


  const handleRestore = (product, index) => {
    setFavoriteProducts((prev) => {
      const newList = [...prev];
      newList.splice(index, 0, product);
      return newList;
    });

    setDeletedItems((prev) =>
      prev.filter((item) => item.product.id !== product.id)
    );
  };
  
  if (loading || !userInfo) return <p className="word3 text-center">載入中...</p>;
  if (favoriteProducts.length === 0 && deletedItems.length === 0)
    return <p className='text-center'>目前沒有收藏任何商品</p>;

  return (
    <div>
      <div className="text-xl grid grid-cols-[3fr_4fr_2fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr] items-center font-bold border-b-2 border-primary pb-2 mb-4">
        <div>商品</div>
        <div>名稱</div>
        <div>價格</div>
        <div></div>
      </div>

      {/* 收藏商品列表 */}
      {favoriteProducts.map((product, index) => (
        <div
          key={product.id}
          className="grid grid-cols-[3fr_4fr_2fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr] items-center gap-4 border-b py-4 transition-opacity duration-300"
        >
          <Link to={`/products/id/${product.id}`}>
            <img
              alt={product.name}
              src={product.image}
              className="w-24 h-24 object-cover"
            />
          </Link>
          <Link to={`/products/id/${product.id}`}>
            <span className="text-base font-medium hover:text-primary">
              {product.name}
            </span>
          </Link>
          <p className="text-base ">${product.price}</p>
          <HeartFilled
            className="heart-filled text-xl cursor-pointer"
            onClick={() => handleUnfollow(product, index)}
            title="取消收藏"
          />
        </div>
      ))}

      {/* 已刪除商品的復原提示 */}
      {deletedItems.map(({ product, index }) => (
        <div
          key={`deleted-${product.id}`}
          className="grid grid-cols-[1fr_1fr_1fr_1fr] items-center gap-4 border-b py-4 text-gray-500 italic transition-all duration-500"
        >
          <div className="col-span-3">
            已取消收藏「{product.name}」
          </div>
          <button
            onClick={() => handleRestore(product, index)}
            className="text-primary underline text-sm hover:text-primary/70"
          >
            復原
          </button>
        </div>
      ))}
    </div>
  );
}
