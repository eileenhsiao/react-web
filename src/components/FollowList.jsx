import { useState } from "react";
import { Link } from "react-router";
import { Badge, theme } from "antd";
import { useUserInfo } from "../../react-query";

export default function FollowList() {
  const {
    token: { colorTextBase },
  } = theme.useToken();
  const { data: userInfo} = useUserInfo() || {};
  const favorites = userInfo.favorites || [];
  const count = favorites.length;
  const toggleOpen = () => {};

  return (
    <div onClick={toggleOpen} className={styles.favorite}>
      
    </div>
  );
}
