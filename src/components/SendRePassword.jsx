import React, { useState } from "react";
import { Button } from "antd";

const SendRePassword = () => {
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = () => {
    console.log("寄送密碼重設信");

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <div>
      <Button className="button1" htmlType="submit" block onClick={handleSubmit}>
        寄送密碼重設信
      </Button>

      {showToast && (
        <div className="toast toast-end">
          <div className="alert">
            <span>已寄送密碼重設信</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendRePassword;