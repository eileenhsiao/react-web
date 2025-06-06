import React, { useState } from "react";
import { Button } from "antd";

const SaveProfile = () => {
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = () => {
    console.log("儲存中...");

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <div>
      <Button className="button1" htmlType="submit" onClick={handleSubmit}>
        儲存變更
      </Button>

      {showToast && (
        <div className="toast toast-end">
          <div className="alert">
            <span>已儲存變更</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaveProfile;