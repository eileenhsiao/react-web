import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { selectPaymentMethod, savePaymentMethod } from "../redux/cartSlice";
import { Link } from "react-router";
import { useState } from "react";
import '@/index.css';
import { selectShippingMethod } from "@/redux/cartSlice";

export default function PaymentMethodCard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { paymentMethod: paymentMethod } = useSelector(selectPaymentMethod);
    const [form] = Form.useForm();
    const [ setShippingMethod] = useState("pickup");
    const handleSubmit = ({ paymentMethod: value }) => {
        dispatch(savePaymentMethod(value));
        navigate('/placeorder');
    };
    const shippingMethod = useSelector(selectShippingMethod);

    return (
        <Form
            onFinish={handleSubmit}
            name="normal_login"
            
            initialValues={paymentMethod}
            form={form}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch ">
            {/* 左邊欄位 */}
            <div className="md:pr-8 md:border-r-2 md:border-primary">
            {shippingMethod === "pickup" && (
                <div>
                    <Form.Item name="paymentMethod" label="Payment Method: "
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
                        <Input placeholder="Enter card number" />
                    </Form.Item>
                </div>
            )}
            {shippingMethod === "home" && (
                <div>
                    <Form.Item name="paymentMethod" label="付款方式 "
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
                        <Input placeholder="Enter card number" />
                    </Form.Item>
                </div>
            )}
            </div>

            {/* 右邊欄位 */}
            </div>
        </Form>
        
    );
}

