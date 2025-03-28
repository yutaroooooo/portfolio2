document.addEventListener("DOMContentLoaded", function () {
    // URL から `id` パラメータを取得
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id"); // 例: "product-001"

    console.log("取得した商品ID:", productId);

    fetch("../JSON/product_data.json")
        .then(response => response.json())
        .then(data => {
            // `id` に基づいて対象の商品を取得
            const product = data.products.find(p => p.id === productId);

            if (!product) {
                console.error("商品データが見つかりません:", productId);
                return;
            }

            console.log("取得した商品データ:", product);

            // ✅ 商品IDを `data-id` にセット
            const productDetailContainer = document.querySelector(".product-detail-container");
            if (productDetailContainer) {
                productDetailContainer.dataset.id = productId;
            } else {
                console.error("❌ product-detail-container の要素が見つかりません");
            }

            // HTML要素の取得
            const productBrand = document.getElementById("product-brand");
            const productName = document.getElementById("product-name");
            const productPrice = document.getElementById("product-price");
            const productMaterial = document.getElementById("product-material");
            const productOrigin = document.getElementById("product-origin");
            const mainImage = document.getElementById("main-product-image");
            const thumbnailContainer = document.getElementById("thumbnail-container");
            const colorOptions = document.getElementById("color-options");
            const sizeOptions = document.getElementById("size-options");
            const sizeTableBody = document.getElementById("size-table-body");

            // **選択カラー & サイズの表示用要素**
            const selectedColorText = document.getElementById("selected-color");
            const selectedSizeText = document.getElementById("selected-size");

            // 商品情報の設定
            productBrand.textContent = product.brand;
            productName.textContent = product.name;
            productPrice.textContent = product.price;
            productMaterial.textContent = product.material;
            productOrigin.textContent = product.origin;

            // **セール対象の商品なら赤文字を適用**
            if (parseInt(product.id.replace("product-", ""), 10) >= 8) {
                productPrice.style.color = "red";
                productPrice.style.fontWeight = "bold";
            }

            // メイン画像の設定
            let currentImageIndex = 0;
            mainImage.src = product.images[currentImageIndex];

            // サムネイル画像の表示
            product.images.forEach((image, index) => {
                const thumbnail = document.createElement("img");
                thumbnail.src = image;
                thumbnail.classList.add("thumbnail");
                if (index === 0) {
                    thumbnail.classList.add("selected");
                }
                thumbnail.addEventListener("click", function () {
                    document.querySelectorAll(".thumbnail").forEach(img => img.classList.remove("selected"));
                    thumbnail.classList.add("selected");
                    mainImage.src = image;
                    currentImageIndex = index;
                });
                thumbnailContainer.appendChild(thumbnail);
            });

            // カラーバリエーションの表示
            colorOptions.innerHTML = "";
            product.colors.forEach(color => {
                const colorDot = document.createElement("div");
                colorDot.classList.add("color-dot");
                colorDot.style.backgroundColor = color.code;
                colorDot.title = color.name;

                colorDot.addEventListener("click", function () {
                    document.querySelectorAll(".color-dot").forEach(dot => dot.classList.remove("selected"));
                    colorDot.classList.add("selected");
                    selectedColorText.textContent = color.name;
                });

                colorOptions.appendChild(colorDot);
            });

            // サイズ選択エリアの追加
            sizeOptions.innerHTML = "";
            product.sizes.forEach(size => {
                const sizeButton = document.createElement("button");
                sizeButton.textContent = size.size;
                sizeButton.classList.add("size-btn");

                sizeButton.addEventListener("click", () => {
                    document.querySelectorAll(".size-btn").forEach(btn => btn.classList.remove("selected"));
                    sizeButton.classList.add("selected");
                    selectedSizeText.textContent = size.size;
                });

                sizeOptions.appendChild(sizeButton);
            });

            // サイズ表の生成
            sizeTableBody.innerHTML = "";
            product.sizes.forEach(sizeData => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${sizeData.size}</td>
                    <td>${sizeData.length}</td>
                    <td>${sizeData.width}</td>
                    <td>${sizeData.sleeve}</td>
                `;
                sizeTableBody.appendChild(row);
            });

            // **カートに追加する処理**
            document.getElementById("add-to-cart").addEventListener("click", function () {
                const selectedColorElement = document.querySelector(".color-dot.selected");
                const selectedSizeElement = document.querySelector(".size-btn.selected");

                if (!selectedColorElement || !selectedSizeElement) {
                    alert("カラーとサイズを選択してください");
                    return;
                }

                // 商品データ作成
                const cartItem = {
                    id: product.id,
                    brand: product.brand,
                    name: product.name,
                    color: selectedColorElement.title,
                    size: selectedSizeElement.textContent.trim(),
                    quantity: 1,
                    price: parseInt(product.price.replace("¥", "").replace(",", "")),
                    image: product.images[0]
                };

                addToCart(cartItem);
                alert("カートに追加しました！");
                window.location.href = "cart.html";
            });
        })
        .catch(error => console.error("JSONデータの取得に失敗しました:", error));
});

// **カート操作関連の関数**
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
    let cart = getCart();

    let existingProduct = cart.find(item =>
        item.id === product.id && 
        item.color === product.color && 
        item.size === product.size
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    saveCart(cart);
}