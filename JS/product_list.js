document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ product_list.js が読み込まれました");

    loadProducts(); // 商品一覧を取得＆表示
    setupFiltersAndSorting(); // フィルターとソートを設定
});

// **商品データを取得＆表示**
function loadProducts() {
    fetch("../JSON/product_data.json")
        .then(response => response.json())
        .then(data => {
            displayProducts(data.products); // 商品一覧を表示
        })
        .catch(error => console.error("❌ 商品データの取得に失敗しました", error));
}

// **商品を一覧に表示**
function displayProducts(products) {
    const productList = document.getElementById("product-list");

    if (!productList) {
        console.error("❌ product-list が見つかりません");
        return;
    }

    productList.innerHTML = ""; // 一旦クリア

    if (products.length === 0) {
        productList.innerHTML = "<p>該当する商品がありません。</p>";
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name}">
            <div class="product-card-info">
                <h3>${product.brand}</h3>
                <p>${product.name}</p>
                <p class="price">${product.price.toLocaleString()}</p>
            </div>
        `;

        productCard.addEventListener("click", () => {
            window.location.href = `product_detail.html?id=${product.id}`;
        });

        productList.appendChild(productCard);
    });
}

// **フィルター＆ソートの設定**
function setupFiltersAndSorting() {
    const categoryFilter = document.getElementById("category-filter");
    const brandFilter = document.getElementById("brand-filter");
    const sortOptions = document.getElementById("sort-options");

    if (!categoryFilter || !brandFilter || !sortOptions) {
        console.error("❌ フィルターまたはソートの要素が見つかりません");
        return;
    }

    categoryFilter.addEventListener("change", applyFiltersAndSorting);
    brandFilter.addEventListener("change", applyFiltersAndSorting);
    sortOptions.addEventListener("change", applyFiltersAndSorting);
}

// **フィルター＆ソートを適用**
function applyFiltersAndSorting() {
    fetch("../JSON/product_data.json")
        .then(response => response.json())
        .then(data => {
            let filteredProducts = data.products;

            // ✅ カテゴリーのマッピング
            const categoryMap = {
                "tops": "トップス",
                "outer": "アウター",
                "bottoms": "ボトムス",
                "accessories": "アクセサリー"
            };

            const categoryKey = document.getElementById("category-filter").value;
            const category = categoryMap[categoryKey] || "all"; // 英語を日本語に変換

            console.log("🧐 選択されたカテゴリー:", categoryKey, "→ マップ後:", category);

            if (category !== "all") {
                filteredProducts = filteredProducts.filter(p => {
                    console.log(`🛒 商品: ${p.name}, カテゴリー: ${p.category}`);
                    return p.category && p.category.trim() === category.trim();
                });
            }

            // ✅ ブランドのマッピング
            const brandMap = {
                "brand1": "ブランドA",
                "brand2": "ブランドB",
                "brand3": "ブランドC"
            };

            const brandKey = document.getElementById("brand-filter").value;
            const brand = brandMap[brandKey] || "all"; // 英語を日本語に変換

            console.log("🏷️ 選択されたブランド:", brandKey, "→ マップ後:", brand);

            if (brand !== "all") {
                filteredProducts = filteredProducts.filter(p => {
                    console.log(`🏷️ 商品: ${p.name}, ブランド: ${p.brand}`);
                    return p.brand && p.brand.trim() === brand.trim();
                });
            }

            console.log("🔍 フィルタ後の商品:", filteredProducts);

            if (filteredProducts.length === 0) {
                console.warn("⚠️ フィルタリング後、該当する商品がありません");
            }

            displayProducts(filteredProducts);
        })
        .catch(error => console.error("❌ フィルター適用中にエラーが発生", error));
}