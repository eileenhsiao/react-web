import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox } from 'antd';
import { WarningOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import '@/index.css';
import { useSignInWithEmailPassword } from "../react-query";

const LoginCard = ({ redirect }) => {
   const { mutate, error, isLoading, isError, isSuccess } = useSignInWithEmailPassword();
   const [isRemember, setIsRemember] = useState(false);
   const [form] = Form.useForm();
   const navigate = useNavigate();

   const passwordInputRef = useRef(null); 

   const onFinish = (values) => {
      console.log("Received values of form: ", values);
      mutate(values);
   };

   useEffect(() => {
      if (isSuccess) {
         navigate('/Profile');
      }
   }, [isSuccess, redirect]);

   return (
      <div className="login-wrapper">
         <Form
            name="normal_login"
            form={form}
            initialValues={{ isRemember: true }}
            onFinish={onFinish}
         >
            <div className="title text-2xl">會員登入</div>
            {/* 電子郵件 */}
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
               onPressEnter={() => {
                  form.validateFields(["email"])
                     .then(() => passwordInputRef.current?.focus())
                     .catch(() => {});
               }}
               />
            </Form.Item>

            {/* 密碼 */}
            <Form.Item
               name="password"
               rules={[{ required: true, message: "請輸入你的密碼" }]}
               hasFeedback
            >
               <Input.Password
               ref={passwordInputRef}
               prefix={<LockOutlined />}
               placeholder="密碼"
               onPressEnter={() => form.submit()}
               />
            </Form.Item>

            {/* 忘記密碼 + 記得我 */}
            <div className="login-options">
               <Link to="/ForgetPassword" className="forgot-link word1">忘記密碼?</Link>
               <Form.Item name="remember" valuePropName="checked" noStyle>
               
               </Form.Item>
            </div>

            {/* 登入按鈕 */}
            <Form.Item>
               <Button className="button1" htmlType="submit" loading={isLoading} block>
               登入
               </Button>
            </Form.Item>

            {/* 提示小字 */}
            <div className="not-member-text">還不是會員？</div>

            {/*  註冊帳號按鈕 */}
            <div className="register-section ">
               <Link to="/register">
               <Button className="button2" block>
                  註冊帳號
               </Button>
               </Link>
            </div>

            {/* 錯誤訊息額外顯示 */}
            {isError && (
               <div className="login-error">
               <WarningOutlined /> 出了一點問題
               <p>{error.message}</p>
               </div>
            )}
         </Form>
      </div>

   );
};

export default LoginCard;
