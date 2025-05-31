import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import {
  selectShippingAddress,
  saveShippingAddress,
  selectPaymentMethod,
  savePaymentMethod,
  selectShippingMethod
} from "../redux/cartSlice";
import { Link } from "react-router";
import '@/index.css';

export default function ShippingAddressCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shippingAddress = useSelector(selectShippingAddress);
  const paymentMethod = useSelector(selectPaymentMethod);
  const shippingMethod = useSelector(selectShippingMethod);
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    // 儲存付款方式與地址
    dispatch(saveShippingAddress(values));
    dispatch(savePaymentMethod(values.paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div>
      {/* 步驟條 */}
      <div className="flex items-center justify-center gap-8 mb-20 text-sm text-primary font-semibold ">
        <div className="flex flex-col items-center">
          <Link to="/Cart" className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border-2 border-primary text-primary flex items-center justify-center">1</div>
            <div className="mt-2 text-xl">確認訂單</div>
          </Link>
        </div>
        <div className="flex-1 h-[1px] bg-primary max-w-[60px] mb-7"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">2</div>
          <div className="mt-2 text-xl">填寫資料</div>
        </div>
        <div className="flex-1 h-[1px] bg-primary max-w-[60px] mb-7"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary text-primary flex items-center justify-center">3</div>
          <div className="mt-2 text-xl">送出訂單</div>
        </div>
      </div>

      {/* 表單開始 */}
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{ ...shippingAddress, paymentMethod: paymentMethod }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* 左欄：收件人資料 + 付款方式 */}
          <div className="flex flex-col justify-between h-full md:pr-8 md:border-r-2 md:border-primary">
            <div>
              <div className="content text-xl mb-4">收件人資料</div>

              <Form.Item
                name="fullName"
                rules={[
                  { type: "string" },
                  { required: true, message: "請輸入收件人姓名" },
                ]}
                hasFeedback
              >
                <Input placeholder="姓名" />
              </Form.Item>

              <Form.Item
                
                name="phonenumber"
                rules={[
                  { type: "string" },
                  { required: true, message: "電話" },
                ]}
                hasFeedback
              >
                <Input placeholder="請輸入聯絡電話" />
              </Form.Item>
            </div>

            <div className="mt-8">
              

              {shippingMethod === "pickup" && (
                  <div>
                    <div className="content text-xl mb-4">取件資料</div>
                      <Form.Item name="customPayCode" 
                          rules={[
                              {
                                  type: "string",
                              },
                              {
                                  required: true,
                                  message: "Please input your card number",
                              },
                          ]}
                          hasFeedback
                      >
                          <Input placeholder="Enter card number" autoComplete="off"/>
                      </Form.Item>
                  </div>
              )}
              {shippingMethod === "home" && (
                  <div>
                    <div className="content text-xl mb-4">宅配資料</div>
                      <Form.Item name="customPayCode" 
                          rules={[
                              {
                                  type: "string",
                              },
                              {
                                  required: true,
                                  message: "Please input your card number",
                              },
                          ]}
                          hasFeedback
                      >
                          <Input placeholder="Enter card number" autoComplete="off"/>
                      </Form.Item>
                  </div>
              )}
            </div>
          </div>

          {/* 右欄：其他收件資訊 */}
          <div className="flex flex-col justify-between h-full">
            
            <div className="content text-xl mb-4">付款資料</div>  
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "請輸入城市" }]}
              hasFeedback
            >
              <Input placeholder="Enter city" />
            </Form.Item>

            <Form.Item
              label="Postal Code"
              name="postalCode"
              rules={[{ required: true, message: "請輸入郵遞區號" }]}
              hasFeedback
            >
              <Input placeholder="Enter postal code" />
            </Form.Item>

            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: "請輸入國家" }]}
              hasFeedback
            >
              <Input placeholder="Enter country" />
            </Form.Item>
            <div className="content text-xl mb-4">其他</div>
            <Form.Item>
              <Button htmlType="submit" className="w-full button1 py-3 rounded mt-6">
                送出訂單
              </Button>
            </Form.Item>
          </div>

        </div>
      </Form>
    </div>
  );
}
