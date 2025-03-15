document.addEventListener("DOMContentLoaded", () => {
    displayCartItems(); // カートアイテムを表示
    updateCartSummary(); // カートの合計金額を計算
    setupUpdateCartButton(); // 「カートを更新する」ボタンの処理を追加
    loadShippingAddress(); // 🚀 配送先住所を取得して表示
    setupProceedToCheckout(); // ✅ 「決済方法に進む」ボタンの処理を追加
});

// **カート内の商品を表示**
function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items-container");
    const cartTable = document.querySelector(".cart-table");
    const cart = getCart();

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<tr><td colspan="4">カートに商品がありません。</td></tr>`;
        return;
    }

    cartItemsContainer.innerHTML = "";

    cart.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><img src="${item.image}" alt="商品画像" class="cart-item-image"></td>
            <td>
                <p><strong>${item.brand}</strong></p>
                <p>${item.name}</p>
                <p>カラー: ${item.color}</p>
                <p>サイズ: ${item.size}</p>
            </td>
            <td>
                <div class="quantity-wrapper">
                    <button class="quantity-btn decrease-qty" data-index="${index}">−</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn increase-qty" data-index="${index}">＋</button>
                </div>
                <button class="remove-btn" data-index="${index}">削除</button>
            </td>
            <td>¥${(item.price * item.quantity).toLocaleString()}</td>
        `;

        cartItemsContainer.appendChild(row);
    });

    addEventListeners();

    if (cart.length > 5) {
        cartTable.style.maxHeight = "400px"; 
        cartTable.style.overflowY = "auto";
    } else {
        cartTable.style.maxHeight = "";
        cartTable.style.overflowY = "";
    }
}

// **カートの合計金額を計算**
function updateCartSummary() {
    const cart = getCart();
    let subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let shipping = subtotal > 0 ? 700 : 0;
    let discount = 0;

    document.getElementById("subtotal").textContent = `¥${subtotal.toLocaleString()}`;
    document.getElementById("discount").textContent = `¥${discount.toLocaleString()}`;
    document.getElementById("shipping").textContent = `¥${shipping.toLocaleString()}`;
    document.getElementById("total-price").textContent = `¥${(subtotal - discount + shipping).toLocaleString()}`;
}

// **数量変更・削除ボタンのイベントを追加**
function addEventListeners() {
    document.querySelectorAll(".increase-qty").forEach(button => {
        button.addEventListener("click", (event) => {
            let cart = getCart();
            let index = event.target.dataset.index;
            cart[index].quantity += 1;
            saveCart(cart);
            displayCartItems();
            updateCartSummary();
        });
    });

    document.querySelectorAll(".decrease-qty").forEach(button => {
        button.addEventListener("click", (event) => {
            let cart = getCart();
            let index = event.target.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
            saveCart(cart);
            displayCartItems();
            updateCartSummary();
        });
    });

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            if (confirm("本当にこの商品を削除しますか？")) {
                let cart = getCart();
                let index = event.target.dataset.index;
                cart.splice(index, 1);
                saveCart(cart);
                displayCartItems();
                updateCartSummary();
            }
        });
    });
}

// **「カートを更新する」ボタンの処理**
function setupUpdateCartButton() {
    const updateCartBtn = document.getElementById("update-cart");
    
    if (!updateCartBtn) {
        console.error("❌ update-cart ボタンが見つかりません");
        return;
    }

    updateCartBtn.addEventListener("click", () => {
        console.log("🔄 カートを更新するボタンがクリックされました");
        
        displayCartItems();
        updateCartSummary();
        
        alert("🛒 カートを最新の状態に更新しました！");
    });
}

// **「決済方法に進む」ボタンの処理**
function setupProceedToCheckout() {
    const proceedCheckoutBtn = document.getElementById("proceed-checkout");

    if (!proceedCheckoutBtn) {
        console.error("❌ proceed-checkout ボタンが見つかりません");
        return;
    }

    proceedCheckoutBtn.addEventListener("click", () => {
        const cart = getCart();
        if (cart.length === 0) {
            alert("カートが空です。商品を追加してください。");
            return;
        }

        // 🚀 `sessionStorage` にカート情報を一時保存
        sessionStorage.setItem("checkoutCart", JSON.stringify(cart));

        // 🚀 `sessionStorage` に配送先情報を一時保存
        let userAddresses = JSON.parse(localStorage.getItem("userAddresses")) || [];
        if (userAddresses.length > 0) {
            sessionStorage.setItem("checkoutAddress", JSON.stringify(userAddresses[0]));
        }

        // ✅ `checkout.html` に遷移
        window.location.href = "checkout.html";
    });
}

// **配送先住所を取得・表示**
function loadShippingAddress() {
    const addressBox = document.getElementById("shipping-address");
    if (!addressBox) return;

    let userAddresses = JSON.parse(localStorage.getItem("userAddresses")) || [];

    if (userAddresses.length === 0) {
        addressBox.innerHTML = `<p>配送先が登録されていません。</p>`;
        return;
    }

    const address = userAddresses[0];

    addressBox.innerHTML = `
        <p><strong>${address.lastName} ${address.firstName}</strong></p>
        <p>${address.postalCode}</p>
        <p>${address.prefecture} ${address.city} ${address.street}</p>
        <p>${address.phone}</p>
    `;
}

// **ローカルストレージからカートデータを取得**
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// **ローカルストレージにカートデータを保存**
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}