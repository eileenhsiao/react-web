/*import { useEffect, useState } from "react";
import { useUserInfo } from "../../react-query"; 
import { getProductById } from "../../api"; 
import { Card, Spin, Empty } from "antd";
import '@/index.css'; 

export default function FavoritesTab() {
  const { data: userInfo, isLoading: userLoading } = useUserInfo();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      const favorites = userInfo?.favorites || [];

      if (favorites.length === 0) {
        setFavoriteProducts([]);
        setLoading(false);
        return;
      }

      try {
        const productPromises = favorites.map((id) => getProductById(id));
        const products = await Promise.all(productPromises);
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
          cover={<img alt={product.name} src={product.image} />}
        >
          <p>{product.description}</p>
          <p>價格：${product.price}</p>
        </Card>
      ))}
    </div>
  );
}*/
