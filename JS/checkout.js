document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ checkout.js が読み込まれました");

    // ✅ 要素の存在チェック
    if (!document.getElementById("checkout-items-container")) {
        console.error("❌ checkout-items-container が見つかりません");
        return;
    }
    if (!document.getElementById("checkout-address")) {
        console.error("❌ checkout-address が見つかりません");
        return;
    }
    if (!document.getElementById("confirm-order")) {
        console.error("❌ confirm-order ボタンが見つかりません");
        return;
    }

    displayOrderSummary();  // ✅ カート情報を取得して表示
    loadShippingAddress();  // ✅ 配送先情報を取得して表示
    setupPaymentOptions();  // ✅ 支払い方法の選択を管理
    setupConfirmOrderButton();  // ✅ 「注文確定」ボタンの動作を実装
});

// **注文概要を表示**
function displayOrderSummary() {
    const orderSummaryContainer = document.getElementById("checkout-items-container");
    const cart = getCheckoutCart(); // ✅ sessionStorage から取得

    if (!orderSummaryContainer) {
        console.error("❌ checkout-items-container の要素が見つかりません");
        return;
    }

    if (cart.length === 0) {
        orderSummaryContainer.innerHTML = "<tr><td colspan='4'>カートに商品がありません。</td></tr>";
        return;
    }

    orderSummaryContainer.innerHTML = ""; // 一旦クリア

    let subtotal = 0;

    cart.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><img src="${item.image}" alt="商品画像" class="summary-item-image"></td>
            <td>
                <p><strong>${item.brand}</strong></p>
                <p>${item.name}</p>
                <p>カラー: ${item.color}</p>
                <p>サイズ: ${item.size}</p>
            </td>
            <td>${item.quantity}</td>
            <td>¥${(item.price * item.quantity).toLocaleString()}</td>
        `;

        subtotal += item.price * item.quantity;
        orderSummaryContainer.appendChild(row);
    });

    const shipping = subtotal > 0 ? 700 : 0; // 商品が1つ以上なら送料700円
    const discount = 0; // 割引なし

    document.getElementById("checkout-subtotal").textContent = `¥${subtotal.toLocaleString()}`;
    document.getElementById("checkout-shipping").textContent = `¥${shipping.toLocaleString()}`;
    document.getElementById("checkout-total-price").textContent = `¥${(subtotal - discount + shipping).toLocaleString()}`;
}

// **配送先情報を取得 & 表示**
function loadShippingAddress() {
    const addressBox = document.getElementById("checkout-address");
    if (!addressBox) {
        console.error("❌ checkout-address の要素が見つかりません");
        return;
    }

    let address = JSON.parse(sessionStorage.getItem("checkoutAddress")); // ✅ sessionStorage から取得

    if (!address) {
        addressBox.innerHTML = `<p>配送先が登録されていません。</p>`;
        return;
    }

    addressBox.innerHTML = `
        <p><strong>${address.lastName} ${address.firstName}</strong></p>
        <p>${address.postalCode}</p>
        <p>${address.prefecture} ${address.city} ${address.street}</p>
        <p>${address.phone}</p>
    `;
}

// **支払い方法の選択を管理**
function setupPaymentOptions() {
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    
    paymentOptions.forEach(option => {
        option.addEventListener("change", () => {
            console.log(`💳 支払い方法が変更されました: ${option.value}`);
        });
    });
}

// **「注文確定」ボタンの動作**
function setupConfirmOrderButton() {
    const confirmOrderBtn = document.getElementById("confirm-order");

    if (!confirmOrderBtn) {
        console.error("❌ confirm-order ボタンが見つかりません");
        return;
    }

    confirmOrderBtn.addEventListener("click", () => {
        console.log("🛒 注文確定ボタンがクリックされました");

        const cart = getCheckoutCart(); // ✅ sessionStorage から取得
        if (cart.length === 0) {
            alert("カートが空です。商品を追加してください。");
            return;
        }

        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        if (!selectedPayment) {
            alert("支払い方法を選択してください。");
            return;
        }

        // ✅ 注文情報を `localStorage` に保存（注文履歴用）
        saveOrderHistory(cart, selectedPayment.value);

        alert(`✅ 注文が確定しました！\n支払い方法: ${selectedPayment.value}`);

        // ✅ `sessionStorage` をクリア
        sessionStorage.removeItem("checkoutCart");
        sessionStorage.removeItem("checkoutAddress");

        // ✅ 注文完了ページへ遷移
        window.location.href = "order_complete.html";
    });
}

// **注文履歴を `localStorage` に保存**
function saveOrderHistory(cart, paymentMethod) {
    let orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];

    const order = {
        orderId: generateOrderId(),
        date: new Date().toLocaleDateString(),
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 700, // 小計 + 送料
        payment: paymentMethod,
        items: cart
    };

    orderHistory.push(order);
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
}

// **注文番号を生成**
function generateOrderId() {
    return "ORD" + Math.floor(Math.random() * 1000000);
}

// **カートデータを `sessionStorage` から取得**
function getCheckoutCart() {
    return JSON.parse(sessionStorage.getItem("checkoutCart")) || [];
}