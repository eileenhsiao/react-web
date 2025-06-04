import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import {
  selectShippingAddress,
  saveShippingAddress,
  selectShippingMethod
} from "../redux/cartSlice";
import { Link } from "react-router";
import '@/index.css';

export default function ShippingAddressCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shippingAddress = useSelector(selectShippingAddress);
  const shippingMethod = useSelector(selectShippingMethod);
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    // 儲存付款方式與地址
    dispatch(saveShippingAddress(values));

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
        initialValues={{ ...shippingAddress }}
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
                  { required: true, message: "請輸入聯絡電話" },
                ]}
                hasFeedback
              >
                <Input placeholder="電話" />
              </Form.Item>
            </div>

            <div className="mt-8">


              {shippingMethod === "pickup" && (
                <div>
                  <div className="content text-xl mb-4">取件資料</div>
                  <Form.Item name="pickupShop"
                    rules={[
                      {
                        type: "string",
                      },
                      {
                        required: true,
                        message: "請輸入取貨分店",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="取貨分店" autoComplete="off" />
                  </Form.Item>
                  <Form.Item name="pickupDate"
                    rules={[
                      {
                        type: "string",
                      },
                      {
                        required: true,
                        message: "請輸入取貨日期",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="日期" autoComplete="off" />
                  </Form.Item>
                  <Form.Item name="pickupTime"
                    rules={[
                      {
                        type: "string",
                      },
                      {
                        required: true,
                        message: "請輸入取貨時間",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="時間" autoComplete="off" />
                  </Form.Item>
                </div>
              )}
              {shippingMethod === "home" && (
                <div>
                  <div className="content text-xl mb-4">宅配資料</div>
                  <Form.Item name="address"
                    rules={[
                      {
                        type: "string",
                      },
                      {
                        required: true,
                        message: "請輸入宅配地址",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="宅配地址" autoComplete="off" />
                  </Form.Item>
                </div>
              )}
            </div>
          </div>

          {/* 右欄：其他收件資訊 */}
          <div className="flex flex-col justify-between h-full">

            <div className="content text-xl mb-4">付款資料</div>
            <Form.Item name="cardnumber"
              rules={[
                {
                  type: "string",
                },
                {
                  required: true,
                  message: "請輸入信用卡卡號",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="信用卡卡號" autoComplete="off" />
            </Form.Item>
            <Form.Item name="cardDate"
              rules={[
                {
                  type: "string",
                },
                {
                  required: true,
                  message: "請輸入信用卡有效期限",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="有效期限" autoComplete="off" />
            </Form.Item>
            <Form.Item name="cardsafenumber"
              rules={[
                {
                  type: "string",
                },
                {
                  required: true,
                  message: "請輸入信用卡安全碼",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="安全碼" autoComplete="off" />
            </Form.Item>


            <div className="content text-xl mb-4">其他</div>
            <Form.Item name="other"
              rules={[
                {
                  type: "string",
                }
              ]}
            >
              <Input placeholder="備註（例：需要附上餐具、蠟燭）"/>
            </Form.Item>
            <button
              onClick={() => {

                navigate("/SendOrder"); // 導向下一頁
              }}
              className="w-full bg-primary text-white py-3 rounded mt-6"
            >
              送出訂單
            </button>
          </div>

        </div>
      </Form>
    </div>
  );
}
