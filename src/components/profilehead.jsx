import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { useUpdateProfile, useLogout, useUserInfo } from "../react-query";
import '@/index.css';

const Profilehead = ({ redirect }) => {
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
    <div className="max-w-4xl mx-auto mt-6 pl-1">
    <Form
      onFinish={onUpdate}
      name="normal_login"
      /*className={styles.profileForm}*/
      form={form}
      initialValues={userInfo}
    >

      <Form.Item>
        <Button
          type="primary"
          danger
          style={{ marginTop: "1rem" }}
          /*className={styles.profileForm__button}*/
          onClick={onLogout}
        >
          Log out
        </Button>
        
      </Form.Item>
    </Form>
    </div>
  );
};
export default Profilehead;
