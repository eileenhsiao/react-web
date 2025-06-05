import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import {
  selectShippingAddress,
  saveShippingAddress,
  selectShippingMethod,

} from "../redux/cartSlice";
import { Link } from "react-router";
import '@/index.css';
import { useState } from "react";
import { clearCartItems } from "../redux/cartSlice";
import { selectCartItems } from "../redux/cartSlice";

import { Select, DatePicker ,Row, Col} from "antd";
const { Option } = Select;
import { clearShippingAddress, generateOrderNumber } from "../redux/cartSlice";
import { useUpdateProfile, useUserInfo } from "../react-query";
import dayjs from "dayjs";
import { useEffect } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../api";

const taiwanCities = {
  "台北市": ["中正區", "大同區", "中山區", "松山區", "大安區", "萬華區", "信義區", "士林區", "北投區", "內湖區", "南港區", "文山區"],
  "新北市": ["板橋區", "三重區", "中和區", "永和區", "新莊區", "新店區", "土城區", "蘆洲區", "汐止區", "樹林區", "淡水區"],
  // 可繼續補上其他縣市
};

export default function ShippingAddressCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shippingAddress = useSelector(selectShippingAddress);
  const shippingMethod = useSelector(selectShippingMethod);
  const [form] = Form.useForm();
  const cartItems = useSelector(selectCartItems);
  const [cardNumberFormatted, setCardNumberFormatted] = useState(
    shippingAddress?.cardnumber || ""
  );
    const shippingFee = shippingMethod === "home" ? 60 : 0;

    const getTotalPrice = () => {
        const itemsTotal = cartItems.length > 0
            ? cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
            : 0;
        return itemsTotal + shippingFee;
    };
  const formatCardNumber = (value) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 16);
    const spaced = digitsOnly.replace(/(.{4})/g, "$1 ").trim();
    return spaced;
  };

  useEffect(() => {
  dispatch(clearShippingAddress());
  form.resetFields(); // 清空表單
}, []);
const price=getTotalPrice();
  const [cardNumber, setCardNumber] = useState(shippingAddress?.cardnumber || "");

  const handleCardNumberChange = (e) => {
    let raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    let formatted = raw.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(formatted);
    form.setFieldsValue({ cardnumber: formatted });
  };
  const [cardDate, setCardDate] = useState(shippingAddress?.cardDate || "");

  const handleCardDateChange = (e) => {
    let raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    let formatted = raw.length <= 2 ? raw : `${raw.slice(0, 2)}/${raw.slice(2)}`;
    setCardDate(formatted);
    form.setFieldsValue({ cardDate: formatted });
  };
  const { data: userInfo } = useUserInfo() || {};
  
  const removeUndefinedFields = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
  const handleSubmit = async (values) => {
    
  try {
    const cleaned = removeUndefinedFields({
  ...values,
  cardnumber: values.cardnumber?.replace(/\s/g, ""),
  pickupDate: values.pickupDate?.format?.("YYYY-MM-DD"),
});
console.log("values from form", values);
    dispatch(saveShippingAddress(cleaned));
console.log("cleaned shipping address:", cleaned);
    // 🔢 產生訂單編號（例如 A123456）
    const orderNumber = generateOrderNumber();

    // 👤 使用者 ID
    const uid = userInfo?.uid; // 假設你有用 useAuth 或 Firebase Auth 拿到目前登入使用者
    if (!uid) {
      navigate("/login");
      return;
    }

    // 📝 準備訂單資料
    const orderData = {
      orderNumber,
      uid,
      shippingAddress: cleaned,
      cartItems: cartItems,
      price,
      createdAt: serverTimestamp(),
    };

    // 🔥 儲存到 Firestore（/users/{uid}/orders/{orderNumber}）
    await setDoc(doc(db, `users/${uid}/orders/${orderNumber}`), orderData);

    // ✅ 清空 Redux 中的購物車
    dispatch(clearCartItems());

    // 👉 導向確認頁
    navigate("/SendOrder", {
      state: {
        cartItems,
        orderNumber, // 傳入以便顯示
      },
    });
    await setDoc(doc(db, `users/${uid}/orders/${orderNumber}`), orderData);
  console.log("✅ 訂單已儲存");
  } catch (error) {
    
    console.error("❌ 發送訂單失敗：", error);
  }
};


  const update = useUpdateProfile();

   useEffect(() => {
    form.setFieldsValue(userInfo);
  }, [userInfo]);

  return (
    <div>
      {/* 步驟條 */}
      <div className="flex items-center justify-center gap-4 md:gap-8 mb-20 text-sm text-primary font-semibold mt-10">
      <div className="flex flex-col items-center">
        <Link to="/Cart" className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary text-primary flex items-center justify-center">1</div>
          <div className="mt-2 text-md md:text-xl">確認訂單</div>
        </Link>
      </div>

      {/* 線段 */}
      <div className="flex-1 min-w-[40px] h-[1px] bg-primary mb-7"></div>

      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">2</div>
        <div className="mt-2 text-md md:text-xl">填寫資料</div>
      </div>

      {/* 線段 */}
      <div className="flex-1 min-w-[40px] h-[1px] bg-primary mb-7"></div>

      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary text-primary flex items-center justify-center">3</div>
        <div className="mt-2 text-md md:text-xl">送出訂單</div>
      </div>
    </div>


      
      {/* 表單開始 */}
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          userInfo,
          ...shippingAddress,
          pickupDate: shippingAddress.pickupDate
            ? dayjs(shippingAddress.pickupDate)
            : null,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 md:mb-20">

          {/* 左欄：收件人資料 + 付款方式 */}
          <div className="flex flex-col justify-between h-full md:pr-8 md:border-r-2 md:border-primary">
            <div>
              <div className="content text-xl mb-4">收件人資料</div>

              <Form.Item
                name="name"
                rules={[
                  { type: "string" },
                  { required: true, message: "請輸入收件人姓名" },
                ]}
                
              >
                <Input placeholder="姓名" />
              </Form.Item>

              <Form.Item

                name="tel"
                rules={[
                  { type: "string" },
                  { required: true, message: "請輸入聯絡電話" },
                  { pattern: /^\d{2}-\d{4}-\d{4}$/, message: "請輸入完整的聯絡電話" }
                ]}
                
              >
                <Input placeholder="電話 00-0000-0000" maxLength={12} />
                
              </Form.Item>
            </div>

            <div className="mt-8">


              {shippingMethod === "pickup" && (
                <div>
                  <div className="content text-xl mb-4">取件資料</div>
                  <Form.Item
                    name="pickupShop"
                    rules={[
                      { required: true, message: "請選擇取貨分店" },
                    ]}
                    
                  >
                    <Select placeholder="選擇取貨分店">
                      <Option value="大安總店">大安總店</Option>

                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="pickupDate"
                    rules={[{ required: true, message: "請選擇取貨日期" }]}
                    
                  >
                    <DatePicker placeholder="選擇日期" className="w-full" />
                  </Form.Item>

                  <Form.Item
                    name="pickupTime"
                    rules={[{ required: true, message: "請選擇取貨時間" }]}
                    
                  >
                    <Select placeholder="選擇時間">
                      <Option value="12:30-13:30">12:30-13:30</Option>
                      <Option value="13:30-14:30">13:30-14:30</Option>
                      <Option value="14:30-15:30">14:30-15:30</Option>
                      <Option value="15:30-16:30">15:30-16:30</Option>
                      <Option value="16:30-17:30">16:30-17:30</Option>
                      <Option value="17:30-18:30">17:30-18:30</Option>
                      <Option value="18:30-19:30">18:30-19:30</Option>
                      <Option value="19:30-20:30">19:30-20:30</Option>

                    </Select>
                  </Form.Item>

                </div>
              )}
              {shippingMethod === "home" && (
                <div>
                  <div className="content text-xl mb-4">宅配資料</div>
                  <Form.Item
                    name="postalCode"
                    label="郵遞區號"
                    rules={[{ required: true, message: "請輸入郵遞區號" }]}
                    
                  >
                    <Input placeholder="如：100" />
                  </Form.Item>

                  <Form.Item
                    name="city"
                    label="縣市"
                    rules={[{ required: true, message: "請選擇縣市" }]}
                    
                  >
                    <Select placeholder="請選擇縣市" allowClear>
                      {Object.keys(taiwanCities).map((city) => (
                        <Option key={city} value={city}>
                          {city}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    shouldUpdate={(prev, curr) => prev.city !== curr.city}
                    noStyle
                  >
                    {({ getFieldValue }) => {
                      const selectedCity = getFieldValue("city");
                      return (
                        <Form.Item
                          name="district"
                          label="區域"
                          rules={[{ required: true, message: "請選擇區域" }]}
                          
                        >
                          <Select placeholder="請選擇區域" allowClear disabled={!selectedCity}>
                            {(taiwanCities[selectedCity] || []).map((district) => (
                              <Option key={district} value={district}>
                                {district}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      );
                    }}
                  </Form.Item>

                  <Form.Item
                    name="addressDetail"
                    label="詳細地址"
                    rules={[{ required: true, message: "請輸入詳細地址" }]}
                    
                  >
                    <Input.TextArea
                      placeholder="請輸入街道、巷弄、號、樓層等資訊"
                      autoSize={{ minRows: 2, maxRows: 4 }}
                    />
                  </Form.Item>
                </div>
              )}
            </div>
          </div>

          {/* 右欄：其他收件資訊 */}
          <div className="flex flex-col justify-between h-full">

            <div className="content text-xl mb-4">付款資料</div>
            <Form.Item
              name="cardnumber"
              rules={[
                { required: true, message: "請輸入信用卡卡號" },
                { pattern: /^\d{16}$/, message: "請輸入16位數字卡號" }
              ]}
              
            >
              <Input placeholder="信用卡卡號 (16位數)" maxLength={16} />
            </Form.Item>
             
            <Row gutter={16}>
            <Col span={12}>
            <Form.Item
              name="cardDate"
              rules={[
                { required: true, message: "請輸入有效期限" },
                { pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, message: "格式應為 MM/YY" }
              ]}
              
            >
              <Input placeholder="有效期限 (MM/YY)" maxLength={5} />
            </Form.Item>

            </Col>
            <Col span={12}>
            <Form.Item
              
              rules={[
                { required: true, message: "請輸入安全碼" },
                { pattern: /^\d{3}$/, message: "請輸入3位數安全碼" }
              ]}
              
            >
              <Input placeholder="安全碼 (3位數)" maxLength={3} />
            </Form.Item>
          </Col>
          </Row>

          


            <div className="content text-xl mb-4">其他</div>
            <Form.Item
              name="other"
              rules={[
                {
                  type: "string",
                },
              ]}
            >
              <Input.TextArea
                placeholder="備註（例：需要附上餐具、蠟燭）"
                autoSize={{ minRows: 3, maxRows: 6 }} // 可調整顯示的最小與最大行數
              />
            </Form.Item>
           <Form.Item>
            <Button
              
              htmlType="submit"
              className="button1 w-full  py-3 rounded mt-6"
            >
              送出訂單
            </Button>
          </Form.Item>

          </div>

        </div>
      </Form>
    </div>
  );
}
