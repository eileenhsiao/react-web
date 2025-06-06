import React, { useState } from "react";
import { Modal, Button } from "antd";

const TermsModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };


    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {/* 替代 Link 為按鈕但保有超連結樣式 */}
            <Button className= "custom-link" type="link" onClick={showModal}>
                使用者條款
            </Button>

            <Modal
                title="使用者條款"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <ol className="list-decimal pl-4 space-y-2">
                    <li>您必須提供真實且完整的註冊資訊。</li>
                    <li>不得使用本平台從事任何非法或未經授權的行為。</li>
                    <li>平台保留隨時修改服務內容與條款的權利。</li>
                    <li>使用者應妥善保管帳號與密碼，避免外洩。</li>
                    <li>若違反條款，平台有權停止或刪除帳號。</li>
                </ol>
                <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    關閉
                </button>
            </Modal>
        </>
    );
};

export default TermsModal;
