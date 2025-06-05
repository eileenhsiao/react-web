import { useEffect, useState } from "react";
import { useUserInfo } from "../react-query"; 
import { Card, Spin, Empty, message } from "antd";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../api";
import { HeartFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import '@/index.css'; 

export default function FavoritesTab() {
  const { data: userInfo, isLoading: userLoading } = useUserInfo();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleUnfollow = async (productId) => {
    if (!userInfo?.uid) return;

    try {
      const followDocRef = doc(db, "users", userInfo.uid, "follows",  String(productId));
      await deleteDoc(followDocRef);
      setFavoriteProducts((prev) => prev.filter((p) => p.id !== productId));
      message.success("已取消收藏");
    } catch (error) {
      console.error("取消收藏失敗：", error);
      message.error("取消收藏失敗");
    }
  };

  if (loading || !userInfo) {
    return <Spin tip="載入中..." />;
  }

  if (favoriteProducts.length === 0) {
    return <Empty description="尚未收藏任何商品" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {favoriteProducts.map((product) => (
        <Card
          key={product.id}
          title={product.name}
          
          cover={<Link to={`/products/id/${product.id}`}>
            <img alt={product.name} src={product.image} className="h-48 object-cover" />
            </Link>}
          extra={
            <HeartFilled
              className="text-red-500 cursor-pointer text-lg"
              onClick={() => handleUnfollow(product.id)}
              title="取消收藏"
            />
          }
        >
          <p className="text-sm text-gray-600">價格：${product.price}</p>
        </Card>
      ))}
    </div>
  );
}
