import React, { useEffect, useState } from 'react';
import { db } from "../api";
import { useUserInfo } from "../react-query";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const OrdersTab = () => {
  const { data: userInfo } = useUserInfo(); 
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
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
        setIsLoading(false); 
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
      

      {isLoading ? ( 
        <p className="word3 text-center">載入中...</p>
      ) : orders.length === 0 ? (
        <p className='text-center'>目前沒有任何訂單紀錄</p>
      ) : (
        orders.map((order) => (
          <div key={order.orderNumber} className="relative bottom-border p-0 md:p-4 mb-4 ">
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
            <div>
              <p className="font-bold">訂單編號：{order.orderNumber}</p>
              <p className="text-sm word3">
                訂購時間：
                {order.createdAt?.seconds
                  ? new Date(order.createdAt.seconds * 1000).toLocaleDateString()
                  : "未知"}
              </p>
            </div>
            <div className="absolute right-4 top-4 text-sm text-primary md:hidden">
              狀態：{order.status}
            </div>
          </div>


          <div className="mt-4">
            {order.cartItems?.[0] && (
              <div className="flex items-center mb-2">
                  <img
                    src={order.cartItems[0].image}
                    alt={order.cartItems[0].name}
                    className="w-16 h-16 object-cover mr-4 flex-shrink-0"
                  />
                  <div className="grid grid-cols-[70%_30%] md:grid-cols-[30%_20%_auto_20%] gap-4 w-full items-center">
                    <p className="font-medium">
                      {order.cartItems[0].name} × {order.cartItems[0].qty}
                    </p>
                    <p className="text-sm whitespace-nowrap">
                      NT${order.cartItems[0].price}
                    </p>
                    <p className="hidden md:block"></p>
                    <div className="text-right text-primary hidden md:block">
                      <p className="text-sm">狀態：{order.status}</p>
                    </div>
                  </div>
                </div>


            )}
            {expandedOrders[order.orderNumber] &&
            order.cartItems.slice(1).map((item) => (
              <div key={item.id} className="flex items-center mb-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover mr-4 flex-shrink-0"
                />
                <div className="grid grid-cols-[70%_30%] md:grid-cols-[30%_20%_auto] gap-4 w-full items-center">
                  <p className="font-medium">
                    {item.name} × {item.qty}
                  </p>
                  <p className="text-sm whitespace-nowrap">NT${item.price}</p>
                  <p className="hidden md:block"></p>
                </div>
              </div>
            ))}


            {order.cartItems?.length > 1 && (
              <div
                className={`text-center mt-2 pt-2 word1 ${
                  expandedOrders[order.orderNumber] ? "border-t" : "border-b"
                }`}
              >
                <button
                  onClick={() => toggleOrder(order.orderNumber)}
                  className="text-sm "
                >
                  {expandedOrders[order.orderNumber]
                    ? "收起商品列表 ▲"
                    : "檢視其他商品 ▼"}
                </button>
              </div>

            )}
          </div>

          <div className="flex justify-end mt-4">
            <p className="font-semibold">總金額：NT${order.price}</p>
          </div>
        </div>

        ))
      )}
    </div>
  );
};

export default OrdersTab;
