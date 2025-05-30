import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { selectPaymentMethod, savePaymentMethod } from "../redux/cartSlice";
import { Link } from "react-router";

export default function PaymentMethodCard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { paymentMethod: paymentMethod } = useSelector(selectPaymentMethod);
    const [form] = Form.useForm();

    const handleSubmit = ({ paymentMethod: value }) => {
        dispatch(savePaymentMethod(value));
        navigate('/placeorder');
    };

    return (
        <Form
            onFinish={handleSubmit}
            name="normal_login"
            /*className={styles.paymentForm}*/
            initialValues={paymentMethod}
            form={form}
        >

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

            <Form.Item>
                <Link to="/sendOrder">
                    <Button
                        type="primary"
                        htmlType="submit"
                    /*className={styles.paymentForm__button}*/
                    >
                        付款
                    </Button>
                </Link>
            </Form.Item>
        </Form>
    );
}

