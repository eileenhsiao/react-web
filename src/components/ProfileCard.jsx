import React, { useState } from 'react';
import { Tabs } from 'antd';
import { UserOutlined, ShoppingCartOutlined, StarOutlined } from '@ant-design/icons';
import ProfileInfoTab from './ProfileInfoTab';
import OrdersTab from './OrdersTab';
/*import FavoritesTab from '../components/FavoritesTab';*/

const ProfileCard = () => {
  const [activeKey, setActiveKey] = useState('1');

  const items = [
    {
      key: '1',
      label: (
        <span>
          <UserOutlined /> 個人資料
        </span>
      ),
      children: <ProfileInfoTab />,
    },
    {
      key: '2',
      label: (
        <span>
          <ShoppingCartOutlined /> 訂單紀錄
        </span>
      ),
      children: <OrdersTab />,
    },
    /*{
      key: '3',
      label: (
        <span>
          <StarOutlined /> 追蹤清單
        </span>
      ),
      children: <FavoritesTab />,
    },*/
  ];

  return (
    <div className="max-w-4xl mx-auto mt-6 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">會員中心</h2>
      <Tabs
        defaultActiveKey="1"
        activeKey={activeKey}
        onChange={setActiveKey}
        items={items}
      />
    </div>
  );
};

export default ProfileCard;
