import { useState } from "react";
import { Link } from "react-router";
import { Badge, theme } from "antd";
import { useUserInfo } from "../../react-query";
import { selectFollowedItems } from "../redux/followSlice";

export default function FollowList() {
const followedItems = useSelector(selectFollowedItems);
  const {
    token: { colorTextBase },
  } = theme.useToken();
  const { data: userInfo} = useUserInfo() || {};
  const favorites = userInfo.favorites || [];
  const count = favorites.length;
  const toggleOpen = () => {};

  return (
    <div onClick={toggleOpen} className={styles.favorite}>
      <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">我的收藏</h2>
      {followedItems.length === 0 ? (
        <p>尚未收藏任何商品。</p>
      ) : (
        <ul className="space-y-4">
          {followedItems.map(item => (
            <li key={item.id} className="border p-4 rounded shadow">
              <Link to={`/product/${item.id}`}>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>價格：TWD {item.price} 元</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}

