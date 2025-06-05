import { useState } from 'react';
import { Tabs } from 'antd';
import '@/index.css';
import Profilehead from '../components/profilehead';
import {
  UserOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import ProfileInfoTab from './ProfileInfoTab';
import OrdersTab from './OrdersTab';
import FavoritesTab from './FavoritesTab';

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
        訂單紀錄
      </span>
    ),
    content: <OrdersTab />,
  },
  {
    key: '3',
    label: (
      <span className="text-base font-semibold">
        <HeartOutlined className="mr-1" />
        追蹤清單
      </span>
    ),
    content: <FavoritesTab />,
  },
];

export default function ProfileCard() {
  const [searchParams] = useSearchParams();
  const tabKeyFromURL = searchParams.get('key') || '1'; 
  const [activeKey, setActiveKey] = useState(tabKeyFromURL);

  return (
    <div className="max-w-sm md:max-w-4xl mx-auto mt-6 pl-1 mb-10 md:mb-20">
      {/* 自訂 Tabs 外觀，只渲染 tab 標籤 */}
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        items={tabItems.map(({ key, label }) => ({ key, label }))}
        className="custom-tabs"
      />

      {/* 內容區塊樣式像卡片，但不包住 tab 標籤 */}
      <div className=" pfcard px-6 py-8 border-t-0">
        {tabItems.find((item) => item.key === activeKey)?.content}
      </div>
    </div>
  );
}
