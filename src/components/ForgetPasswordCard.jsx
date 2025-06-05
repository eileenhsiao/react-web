import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button } from 'antd';
import { WarningOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import '@/index.css';
import { useSignInWithEmailPassword } from "../react-query";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../api"; 

const ForgetPasswordCard = ({ redirect }) => {
  const {isSuccess } = useSignInWithEmailPassword();
  const [form] = Form.useForm();
  const navigate = useNavigate();


  const onFinish = async ({ email }) => {
  try {
    await sendPasswordResetEmail(auth, email);
    message.success("重設密碼連結已寄出，請查看你的信箱");
  } catch (err) {
    console.error(err);
    message.error("發送失敗：" + err.message);
  }
};

  useEffect(() => {
    if (isSuccess) {
      navigate(redirect);
    }
  }, [isSuccess, redirect]);

  return (
    <div className="login-wrapper">
      <Form
  name="reset_password"
  form={form}
  onFinish={onFinish}
>
  <div className="title text-2xl">忘記密碼?</div>

  <Form.Item
    name="email"
    rules={[
      { type: "email", message: "不是有效的電子郵件" },
      { required: true, message: "請輸入你的電子郵件" },
    ]}
    hasFeedback
  >
    <Input
      prefix={<MailOutlined />}
      placeholder="電子郵件"
    />
  </Form.Item>

  <Form.Item>
    <Button className="button1" htmlType="submit" block>
      寄送密碼重設信
    </Button>
  </Form.Item>

  <div className="register-section mt-10">
    <Link to="/Login">
      <Button className="button2" block>會員登入</Button>
    </Link>
  </div>
</Form>
    </div>
  );
};

export default ForgetPasswordCard;
