import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "antd";
import { useUpdateProfile, useLogout, useUserInfo } from "../react-query";
import '@/index.css';

const Profilehead = ({ redirect }) => {
  const { data: userInfo } = useUserInfo() || {};
  const update = useUpdateProfile();
  const logout = useLogout();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onUpdate = async (values) => {
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
    <div className="max-w-4xl mx-auto mt-6 pl-1">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-semibold">
          歡迎 {userInfo?.name || "使用者"}
        </div>
        <Button
          
          danger
          onClick={onLogout}
          className="button2 "
        >
          登出
        </Button>
      </div>

      <Form
        onFinish={onUpdate}
        name="normal_login"
        form={form}
        initialValues={userInfo}
      >
        
      </Form>
    </div>
  );
};

export default Profilehead;
