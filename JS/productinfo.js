document.addEventListener("DOMContentLoaded", function () {
    // JSONデータを取得
    fetch("../JSON/product_data.json")
        .then(response => response.json())
        .then(data => {
            const products = data.products; // 商品データを取得

            if (!products || products.length === 0) {
                console.error("商品データが見つかりません。");
                return;
            }

            // 商品カードとランキングアイテムを取得
            const productCards = document.querySelectorAll(".product-card");
            const rankingItems = document.querySelectorAll(".ranking-item");
            const saleItems = document.querySelectorAll(".sale-item");

            // 共通の関数でカラードットを適用
            function applyProductData(elements) {
                elements.forEach((card, index) => {
                    if (index >= products.length) return;

                    const product = products[index];
                    const colorOptions = card.querySelector(".color-options");
                    const brandElement = card.querySelector(".brand-name");
                    const nameElement = card.querySelector(".product-name");
                    const priceElement = card.querySelector(".price");

                    // ブランド、商品名、価格を設定
                    if (brandElement) brandElement.textContent = product.brand;
                    if (nameElement) nameElement.textContent = product.name;
                    if (priceElement) priceElement.textContent = product.price;

                    // カラーオプションの追加
                    colorOptions.innerHTML = ""; // 既存の内容をクリア
                    product.colors.forEach(color => {
                        const span = document.createElement("span");
                        span.classList.add("color-dot");
                        span.style.backgroundColor = color.code;
                        span.title = color.name;
                        colorOptions.appendChild(span);
                    });
                });
            }

            // NEW ARRIVALS, RANKING, SALE に適用
            applyProductData(productCards);
            applyProductData(rankingItems);
            applyProductData(saleItems);
        })
        .catch(error => console.error("JSONデータの取得に失敗しました:", error));
});