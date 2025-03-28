document.addEventListener("DOMContentLoaded", function () {
    const addressContainer = document.getElementById("address-container");
    const addAddressBtn = document.getElementById("add-address-btn");
    const addressForm = document.getElementById("address-form");
    const addressFormBtn = document.getElementById("address-form-btn");

    // 🚀 配送先情報を取得・表示（address.html 用）
    function loadAddresses() {
        if (!addressContainer) return; // address.html でのみ実行

        addressContainer.innerHTML = ""; // 一旦クリア
        let userAddresses = JSON.parse(localStorage.getItem("userAddresses")) || [];

        userAddresses.forEach((address, index) => {
            const div = document.createElement("div");
            div.className = "address-box";
            div.innerHTML = `
                <div class="menu-container">
                    <button class="menu-button">︙</button>
                    <div class="menu-dropdown">
                        <button class="edit-button" data-index="${index}">編集</button>
                        <button class="delete-button" data-index="${index}">削除</button>
                    </div>
                </div>
                <p><strong>${address.lastName} ${address.firstName}</strong></p>
                <p>${address.postalCode}</p>
                <p>${address.prefecture} ${address.city} ${address.street}</p>
                <p>${address.phone}</p>
            `;
            addressContainer.appendChild(div);
        });
    }

    // 📌 ︙メニューの動作
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("menu-button")) {
            const dropdown = event.target.nextElementSibling;
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        } else {
            document.querySelectorAll(".menu-dropdown").forEach(menu => {
                menu.style.display = "none";
            });
        }
    });

    // 📌 「編集」ボタンの動作
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("edit-button")) {
            const index = event.target.dataset.index;
            localStorage.setItem("editAddressIndex", index); // 編集対象のインデックスを保存
            window.location.href = "edit_address.html"; // 編集ページへ遷移
        }
    });

    // 📌 「削除」ボタンの動作
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-button")) {
            if (confirm("この配送先を削除しますか？")) {
                const index = event.target.dataset.index;
                let userAddresses = JSON.parse(localStorage.getItem("userAddresses")) || [];
                userAddresses.splice(index, 1); // 配列から削除
                localStorage.setItem("userAddresses", JSON.stringify(userAddresses));
                loadAddresses(); // 再描画
            }
        }
    });

    // 📌 新規追加ボタン（address.html 用）
    if (addAddressBtn) {
        addAddressBtn.addEventListener("click", function () {
            window.location.href = "add_address.html";
        });
    }

    // 📌 配送先を追加（add_address.html 用）
    if (addressFormBtn) {
        addressFormBtn.addEventListener("click", function (event) {
            event.preventDefault();

            const newAddress = {
                lastName: document.getElementById("last-name").value.trim(),
                firstName: document.getElementById("first-name").value.trim(),
                postalCode: document.getElementById("postal-code").value.trim(),
                prefecture: document.getElementById("prefecture").value.trim(),
                city: document.getElementById("city").value.trim(),
                street: document.getElementById("street").value.trim(),
                phone: document.getElementById("phone").value.trim()
            };

            // 🚀 バリデーション（必須項目チェック）
            if (!newAddress.lastName || !newAddress.firstName || !newAddress.postalCode ||
                !newAddress.prefecture || !newAddress.city || !newAddress.street || !newAddress.phone) {
                alert("必須項目をすべて入力してください。");
                return;
            }

            let addresses = JSON.parse(localStorage.getItem("userAddresses")) || [];
            addresses.push(newAddress);
            localStorage.setItem("userAddresses", JSON.stringify(addresses));

            alert("配送先が追加されました！");
            window.location.href = "address.html"; // 一覧ページへ遷移
        });
    }

    // 📌 配送先の一覧をロード（address.html 用）
    loadAddresses();
});