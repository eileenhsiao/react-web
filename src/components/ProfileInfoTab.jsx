import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { useUpdateProfile, useLogout, useUserInfo } from "../react-query";
import '@/index.css';

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
  }

  useEffect(() => {
    form.setFieldsValue(userInfo)
  }, [userInfo])

  return (
    <Form
      onFinish={onUpdate}
      name="normal_login"
      
      form={form}
      initialValues={userInfo}
    >
      <Form.Item
        label="姓名: "
        name="name"
        rules={[
          {
            type: "string",
            message: "並非有效的姓名!",
          },
          {
            message: "請輸入你的姓名!",
          },
        ]}
      >
        <Input placeholder={userInfo.name} />
      </Form.Item>
      <Form.Item
        label="地址: "
        name="adrs"
        rules={[
          {
            type: "string",
            message: "並非有效的電話號碼!",
          },
          {
            message: "請輸入你的電話號碼!",
          },
        ]}
      >
        <Input placeholder={userInfo?.adrs || ""} />
      </Form.Item>
      <Form.Item
        label="電話: "
        name="tel"
        rules={[
          {
            type: "string",
            message: "並非有效的電話號碼!",
          },
          {
            message: "請輸入你的電話號碼!",
          },
        ]}
      >
        <Input placeholder={userInfo?.tel || 'xxxx-xxxxxx'} />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          
        >
          Submit
        </Button>

        
      </Form.Item>
    </Form>
  );
};
export default ProfileInfoTab;
