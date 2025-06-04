import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Row, Col, Select } from "antd";
import { useUpdateProfile, useLogout, useUserInfo } from "../react-query";
import '@/index.css';

const { Option } = Select;

const taiwanCities = {
  "台北市": ["中正區", "大同區", "中山區", "松山區", "大安區", "萬華區", "信義區", "士林區", "北投區", "內湖區", "南港區", "文山區"],
  "新北市": ["板橋區", "三重區", "中和區", "永和區", "新莊區", "新店區", "土城區", "蘆洲區", "汐止區", "樹林區", "淡水區"],
  // 可擴充其他縣市
};

const ProfileInfoTab = ({ redirect }) => {
  const { data: userInfo } = useUserInfo() || {};
  const update = useUpdateProfile();
  const logout = useLogout();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onUpdate = async (values) => {
    console.log("Received update info: ", values);
    update.mutate({ ...values, uid: userInfo.uid });
  };

  const onLogout = () => {
    logout.mutate();
    navigate("/");
  };

  useEffect(() => {
    form.setFieldsValue(userInfo);
  }, [userInfo]);

  return (
    <Form
      onFinish={onUpdate}
      name="profile_form"
      form={form}
      initialValues={userInfo}
      layout="vertical"
    >
      <Row gutter={32}>
        {/* 左欄：基本資料 */}
        <Col xs={24} md={12}>
          <Form.Item
          
            label="姓名"
            name="name"
            rules={[
              { type: "string", message: "並非有效的姓名!" },
              { required: true, message: "請輸入你的姓名!" },
            ]}
          >
            <Input placeholder="請輸入姓名" />
          </Form.Item>

          <Form.Item
                    name="email"
                    label="電子郵件"
                    rules={[
                      { type: "email", message: "不是有效的電子郵件" },
                      { required: true, message: "請輸入你的電子郵件" },
                    ]}
                    hasFeedback
                  >
                    <Input  placeholder="電子郵件" />
                  </Form.Item>

          <Form.Item
            label="電話"
            name="tel"
            rules={[
              { type: "string", message: "並非有效的電話號碼!" },
              
            ]}
          >
            <Input placeholder="請輸入電話號碼" />
          </Form.Item>
        </Col>

        {/* 右欄：宅配資料與付款 */}
        <Col xs={24} md={12}>
          <div className="content text-xl mb-2">宅配資料</div>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="postalCode"
                label="郵遞區號"
                //rules={[{ required: true, message: "請輸入郵遞區號" }]}
              >
                <Input placeholder="如：100" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="city"
                label="縣市"
                //rules={[{ required: true, message: "請選擇縣市" }]}
              >
                <Select placeholder="請選擇縣市" allowClear>
                  {Object.keys(taiwanCities).map((city) => (
                    <Option key={city} value={city}>
                      {city}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item shouldUpdate={(prev, curr) => prev.city !== curr.city} noStyle>
                {({ getFieldValue }) => {
                  const selectedCity = getFieldValue("city");
                  return (
                    <Form.Item
                      name="district"
                      label="區域"
                      //rules={[{ required: true, message: "請選擇區域" }]}
                    >
                      <Select
                        placeholder="請選擇區域"
                        allowClear
                        disabled={!selectedCity}
                      >
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
            </Col>
          </Row>


          <Form.Item
            name="addressDetail"
            label="詳細地址"
            //rules={[{ required: true, message: "請輸入詳細地址" }]}
          >
            <Input.TextArea
              placeholder="請輸入街道、巷弄、號、樓層等資訊"
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
          </Form.Item>

          <div className="content text-xl mb-2">付款資料</div>

          <Form.Item
            name="cardnumber"
            //label="信用卡卡號"
            rules={[
              { pattern: /^\d{16}$/, message: "請輸入16位數字卡號" },
            ]}
            hasFeedback
          >
            <Input placeholder="信用卡卡號 (16位數)" maxLength={16} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="cardDate"
                //label="有效期限"
                rules={[
                  
                  { pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, message: "格式應為 MM/YY" },
                ]}
                hasFeedback
              >
                <Input placeholder="MM/YY" maxLength={5} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cardsafenumber"
                //label="安全碼"
                rules={[
                  
                  { pattern: /^\d{3}$/, message: "請輸入3位數安全碼" },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="安全碼 (3位數)" maxLength={3} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="mt-6">
          <div className="flex justify-end gap-4">
            <Button onClick={() => form.setFieldsValue(userInfo)} className="button2">
              取消
            </Button>
            <Button className="button1" htmlType="submit">
              儲存變更
            </Button>
          </div>
        </Form.Item>
        </Col>
      </Row>

      
    </Form>
  );
};

export default ProfileInfoTab;
