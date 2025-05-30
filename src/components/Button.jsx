import { feedProducts } from "@/api/index"; // 調整成你的路徑

function AdminFeedButton() {
  const handleClick = async () => {
    await feedProducts();
    alert("商品資料已重新匯入！");
  };

  return (
    <div className="text-center mt-10">
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        匯入商品資料
      </button>
    </div>
  );
}

export default AdminFeedButton;