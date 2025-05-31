import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button } from 'antd';
import { WarningOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import '@/index.css';
import { useSignInWithEmailPassword } from "../react-query";

const ForgetPasswordCard = ({ redirect }) => {
  const { mutate, error, isLoading, isError, isSuccess } = useSignInWithEmailPassword();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const rePasswordRef = useRef(null);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    mutate(values);
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
        <div className="title text-2xl">重設密碼</div>

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
            onPressEnter={() => form.validateFields(["email"]).then(() => form.getFieldInstance("password")?.focus())}
          />
        </Form.Item>

        {/* 新密碼 */}
        <Form.Item
          name="password"
          rules={[{ required: true, message: "請輸入你的新密碼" }]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="新密碼"
            onPressEnter={() => rePasswordRef.current?.focus()}
          />
        </Form.Item>

        {/* 確認新密碼 */}
        <Form.Item
          name="rePassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "請再次輸入你的密碼" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("兩次輸入的密碼不一致"));
              },
            }),
          ]}
        >
          <Input.Password
            ref={rePasswordRef}
            prefix={<LockOutlined />}
            placeholder="請再次輸入你的密碼"
            onPressEnter={() => form.submit()}
          />
        </Form.Item>

        {/* 提交按鈕 */}
        <Form.Item>
          <Button
            className="button1"
            htmlType="submit"
            loading={isLoading}
            block
          >
            重設密碼
          </Button>
        </Form.Item>

        {/* 錯誤訊息額外顯示 */}
        {isError && (
          <div className="login-error">
            <WarningOutlined /> 出了一點問題
            <p>{error.message}</p>
          </div>
        )}

        {/* 返回登入 */}
        <div className="register-section">
          <Link to="/login">
            <Button className="button2" block>
              返回登入
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default ForgetPasswordCard;
