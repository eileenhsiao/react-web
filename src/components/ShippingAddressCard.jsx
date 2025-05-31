import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import { selectShippingAddress, saveShippingAddress } from "../redux/cartSlice";
import { Link } from "react-router";
import '@/index.css';

export default function ShippingAddressCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shippingAddress = useSelector(selectShippingAddress);
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    dispatch(saveShippingAddress(values));
    navigate("/payment");
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-8 mb-20 text-sm text-primary font-semibold">
                        {/* 步驟 1 */}
                         <div className="flex flex-col items-center">
                          <Link to="/Cart" className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full border-2 border-primary text-primary flex items-center justify-center">
                              1
                            </div>
                            <div className="mt-2 text-xl">確認訂單</div>
                          </Link>
                        </div>

                        {/* 線 */}
                        <div className="flex-1 h-[1px] bg-primary max-w-[60px] mb-7"></div>

                        {/* 步驟 2 */}
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">2</div>
                            <div className="mt-2 text-xl">填寫資料</div>
                        </div>

                        {/* 線 */}
                        <div className="flex-1 h-[1px] bg-primary max-w-[60px] mb-7"></div>

                        {/* 步驟 3 */}
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full border-2 border-primary text-primary flex items-center justify-center">3</div>
                            <div className="mt-2 text-xl">送出訂單</div>
                        </div>
                        </div>
                        <Form
                          onFinish={handleSubmit}
                          initialValues={shippingAddress}
                          form={form}
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                            {/* 左邊欄位 */}
                            <div>
                              <div className="content text-xl">收件人資料</div>
                              <Form.Item
                                
                                name="fullName"
                                rules={[
                                  { type: "string" },
                                  { required: true, message: "姓名" },
                                ]}
                                hasFeedback
                              >
                                <Input placeholder="Enter full name" />
                              </Form.Item>

                              <Form.Item
                                label="Address: "
                                name="address"
                                rules={[
                                  { type: "string" },
                                  { required: true, message: "Please input your address" },
                                ]}
                                hasFeedback
                              >
                                <Input placeholder="Enter address" />
                              </Form.Item>

                              <Form.Item
                                label="City: "
                                name="city"
                                rules={[{ required: true, message: "Please input your city" }]}
                                hasFeedback
                              >
                                <Input placeholder="Enter city" />
                              </Form.Item>
                            </div>

                            {/* 右邊欄位 */}
                            <div className="md:pl-4 md:border-l-2 md:border-primary md:flex md:flex-col md:justify-between md:h-full">
                              <div>
                                <Form.Item
                                  label="Postal Code: "
                                  name="postalCode"
                                  rules={[{ required: true, message: "Please input your postal code" }]}
                                  hasFeedback
                                >
                                  <Input placeholder="Enter postal code" />
                                </Form.Item>

                                <Form.Item
                                  label="Country: "
                                  name="country"
                                  rules={[{ required: true, message: "Please input your country" }]}
                                  hasFeedback
                                >
                                  <Input placeholder="Enter country" />
                                </Form.Item>
                              </div>

                              
                            </div>
                          </div>
                        </Form>

    
    </div>
  );
}

