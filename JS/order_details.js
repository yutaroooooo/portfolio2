document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ order_detail.js が読み込まれました");

    displayOrderDetails(); // ✅ 注文詳細を表示
});

// **注文詳細を表示**
function displayOrderDetails() {
    const orderDetailContainer = document.getElementById("order-detail-container");

    // ✅ IDが見つからない場合は処理を中断
    if (!orderDetailContainer) {
        console.error("❌ order-detail-container が見つかりません。");
        return;
    }

    // ✅ `sessionStorage` から注文情報を取得
    let selectedOrder = JSON.parse(sessionStorage.getItem("selectedOrder"));

    if (!selectedOrder) {
        orderDetailContainer.innerHTML = "<p>注文情報が見つかりません。</p>";
        return;
    }

    // ✅ 注文情報を商品リストの上部に統合
    orderDetailContainer.innerHTML = `
        <table class="order-items-table">
            <thead>
                <tr>
                    <td colspan="2"><strong>注文番号:</strong> ${selectedOrder.orderId}</td>
                    <td colspan="2"><strong>注文日:</strong> ${selectedOrder.date}</td>
                    <td colspan="2"><strong>合計金額:</strong> ¥${selectedOrder.total.toLocaleString()}</td>
                </tr>
                <tr>
                    <th>商品画像</th>
                    <th>商品名</th>
                    <th>カラー</th>
                    <th>サイズ</th>
                    <th>数量</th>
                    <th>価格</th>
                </tr>
            </thead>
            <tbody>
                ${selectedOrder.items.map(item => `
                    <tr>
                        <td><img src="${item.image}" alt="商品画像" class="order-item-image"></td>
                        <td>${item.name}</td>
                        <td>${item.color}</td>
                        <td>${item.size}</td>
                        <td>${item.quantity}</td>
                        <td>¥${(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}