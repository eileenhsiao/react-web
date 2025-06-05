import React, { useEffect, useState } from 'react';
import { db } from "../api";
import { useUserInfo } from "../react-query";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const OrdersTab = () => {
  const { data: userInfo } = useUserInfo(); 
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 👈 載入狀態
  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userInfo?.uid) return;

      try {
        const uid = userInfo.uid;
        const ordersRef = collection(db, `users/${uid}/orders`);
        const q = query(ordersRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const fetchedOrders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(fetchedOrders);
      } catch (error) {
        console.error("無法取得訂單紀錄：", error);
      } finally {
        setIsLoading(false); // 👈 無論成功或失敗都結束 loading
      }
    };

    fetchOrders();
  }, [userInfo]);

  const toggleOrder = (orderNumber) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderNumber]: !prev[orderNumber],
    }));
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">訂單紀錄</h3>

      {isLoading ? ( // 👈 加上 loading 顯示邏輯
        <p className="text-gray-500">載入中...</p>
      ) : orders.length === 0 ? (
        <p>目前沒有任何訂單紀錄。</p>
      ) : (
        orders.map((order) => (
          <div key={order.orderNumber} className="border p-4 mb-4 rounded">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">訂單編號：{order.orderNumber}</p>
                <p className="text-sm text-gray-500">
                  建立時間：
                  {order.createdAt?.seconds
                    ? new Date(order.createdAt.seconds * 1000).toLocaleString()
                    : "未知"}
                </p>
                <p className="text-sm">狀態：{order.status}</p>
              </div>
              <div className="text-right">
                <p>總金額：NT${order.price}</p>
                {order.cartItems?.length > 1 && (
                  <button
                    onClick={() => toggleOrder(order.orderNumber)}
                    className="text-blue-500 text-sm mt-2"
                  >
                    {expandedOrders[order.orderNumber] ? '收起商品列表 ▲' : '檢視其他商品 ▼'}
                  </button>
                )}
              </div>
            </div>
            <div className="mt-4">
              {order.cartItems?.[0] && (
                <div className="flex items-center mb-2">
                  <img
                    src={order.cartItems[0].image}
                    alt={order.cartItems[0].name}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <p>{order.cartItems[0].name}</p>
                    <p className="text-sm text-gray-500">
                      數量：{order.cartItems[0].qty}，單價：NT${order.cartItems[0].price}
                    </p>
                  </div>
                </div>
              )}
              {expandedOrders[order.orderNumber] &&
                order.cartItems.slice(1).map((item) => (
                  <div key={item.id} className="flex items-center mb-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover mr-4"
                    />
                    <div>
                      <p>{item.name}</p>
                      <p className="text-sm text-gray-500">
                        數量：{item.qty}，單價：NT${item.price}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersTab;
