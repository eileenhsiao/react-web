import { useState } from 'react';
import { Tabs } from 'antd';
import '@/index.css';
import Profilehead from '../components/profilehead';
import {
  UserOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from '@ant-design/icons';
import ProfileInfoTab from './ProfileInfoTab';
import OrdersTab from './OrdersTab';
// import FavoritesTab from './FavoritesTab';

const tabItems = [
  {
    key: '1',
    label: (
      <span className="text-base font-semibold">
        <UserOutlined className="mr-1" />
        個人資訊
      </span>
    ),
    content: <ProfileInfoTab />,
  },
  {
    key: '2',
    label: (
      <span className="text-base font-semibold">
        <ShoppingCartOutlined className="mr-1" />
        訂單
      </span>
    ),
    content: <OrdersTab />,
  },
  // {
  //   key: '3',
  //   label: (
  //     <span className="text-base font-semibold">
  //       <StarOutlined className="mr-1" />
  //       追蹤清單
  //     </span>
  //   ),
  //   content: <FavoritesTab />,
  // },
];

export default function ProfileCard() {
  const [activeKey, setActiveKey] = useState('1');

  return (
    <div className="max-w-4xl mx-auto mt-6 pl-1">
      {/* 自訂 Tabs 外觀，只渲染 tab 標籤 */}
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        items={tabItems.map(({ key, label }) => ({ key, label }))}
        className="custom-tabs"
      />

      {/* 內容區塊樣式像卡片，但不包住 tab 標籤 */}
      <div className="bg-white pfcard px-6 py-8 border-t-0">
        {tabItems.find((item) => item.key === activeKey)?.content}
      </div>
    </div>
  );
}
