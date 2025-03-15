document.addEventListener("DOMContentLoaded", () => {
    cleanUpOldOrders(); // ✅ 古い仮データを削除
    displayOrderHistory(); // ✅ 注文履歴を表示
});

// **✅ 注文履歴を表示**
function displayOrderHistory() {
    const orderTableBody = document.getElementById("order-history-body");

    if (!orderTableBody) {
        console.error("❌ order-history-body が見つかりません。HTMLに追加されているか確認してください。");
        return;
    }

    // ✅ ローカルストレージから注文履歴を取得
    let orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];

    if (orderHistory.length === 0) {
        orderTableBody.innerHTML = "<tr><td colspan='4'>注文履歴がありません。</td></tr>";
        return;
    }

    orderTableBody.innerHTML = ""; // ✅ 一旦クリア

    // ✅ 最新の注文を上に表示するため `reverse()` を適用
    const reversedHistory = [...orderHistory].reverse();

    reversedHistory.forEach((order, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${order.orderId || generateUniqueOrderId()}</td> <!-- ✅ IDがない場合は新規作成 -->
            <td>${order.date}</td>
            <td>¥${order.total.toLocaleString()}</td>
            <td>
                <button class="details-btn" data-index="${index}">詳細を見る</button>
            </td>
        `;

        orderTableBody.appendChild(row);
    });

    // ✅ 「詳細を見る」ボタンのイベントを追加
document.querySelectorAll(".details-btn").forEach(button => {
    button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;

        // ✅ ローカルストレージから注文履歴を取得
        let orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];

        // ✅ 選択した注文の情報を取得
        if (!orderHistory[index]) {
            console.error("❌ 注文情報が見つかりません。");
            return;
        }
        const selectedOrder = orderHistory[index];

        // ✅ `sessionStorage` に選択した注文情報を保存
        sessionStorage.setItem("selectedOrder", JSON.stringify(selectedOrder));

        // ✅ `order_details.html` に遷移
        window.location.href = "order_details.html";
    });
});
}

// **✅ 古い仮データを削除**
function cleanUpOldOrders() {
    let orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];

    // ✅ `orderId` がない、または特定のテストデータを削除
    orderHistory = orderHistory.filter(order => order.orderId && !/^ORD1741954982829\d+$/.test(order.orderId));

    // ✅ 修正後のデータを再保存（注文履歴が二重にならないよう `displayOrderHistory` の外で保存）
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
}

// **✅ ユニークな注文IDを生成**
function generateUniqueOrderId() {
    return `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
}