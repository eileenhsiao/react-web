import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Checkbox, Button } from "antd";
import { WarningOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useRegisterWithEmailPassword } from "../react-query";
import "@/index.css";

const RegisterCard = ({ redirect }) => {
  const { mutate, error, isLoading, isError, isSuccess } = useRegisterWithEmailPassword();
  const [form] = Form.useForm();
  const navigate = useNavigate();

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
        name="register"
        form={form}
        onFinish={onFinish}
        scrollToFirstError
      >
        <div className="title text-2xl">註冊帳號</div>

        {/* 用戶名 */}
        <Form.Item
          name="name"
          label="用戶名"
          tooltip="你希望別人怎麼稱呼你？"
          rules={[{ required: true, message: "請輸入用戶名", whitespace: true }]}
        >
          <Input placeholder="用戶名" />
        </Form.Item>

        {/* 電子郵件 */}
        <Form.Item
          name="email"
          label="電子郵件"
          rules={[
            { type: "email", message: "不是有效的電子郵件" },
            { required: true, message: "請輸入你的電子郵件" },
          ]}
          hasFeedback
        >
          <Input placeholder="電子郵件" />
        </Form.Item>

        {/* 密碼 */}
        <Form.Item
          name="password"
          label="密碼"
          rules={[{ required: true, message: "請輸入你的密碼" }]}
          hasFeedback
        >
          <Input.Password placeholder="密碼" />
        </Form.Item>

        {/* 再次輸入密碼 */}
        <Form.Item
          name="rePassword"
          label="請再次輸入密碼"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "請重新輸入你的密碼" },
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
          <Input.Password placeholder="再次輸入密碼" />
        </Form.Item>

        {/* 使用者條款勾選 */}
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[{
            validator: (_, value) => value
              ? Promise.resolve()
              : Promise.reject(new Error("請勾選同意使用者條款"))
          }]}
        >
          <Checkbox className="word2">
            我已閱讀 <Link to="/">使用者條款</Link>
          </Checkbox>
        </Form.Item>

        {/* 提交按鈕與錯誤訊息 */}
        <Form.Item>
          <Button
            className="button1 mb-10"
            htmlType="submit"
            loading={isLoading}
            block
          >
            加入會員
          </Button>

          <div className="not-member-text mb-2">已經是會員？</div>

          <div className="register-section">
            <Link to="/login">
              <Button className="button2" block>
                會員登入
              </Button>
            </Link>
          </div>

          {isError && (
            <div className="login-error">
              <WarningOutlined /> 出了一點問題
              <p>{error.message}</p>
            </div>
          )}
        </Form.Item>
      </Form>

    </div>

  );
};

export default RegisterCard;
