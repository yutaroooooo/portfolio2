document.addEventListener("DOMContentLoaded", function () {
    // ✅ URL から `id` パラメータを取得
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id"); // 例: "product-001"

    console.log("取得した商品ID:", productId);

    if (!productId) {
        console.error("❌ 商品IDが取得できません");
        return;
    }

    // ✅ 商品データを取得
    fetch("../JSON/product_data.json")
        .then(response => response.json())
        .then(data => {
            const product = data.products.find(p => p.id === productId);
            if (!product) {
                console.error("❌ 商品データが見つかりません:", productId);
                return;
            }

            console.log("✅ 取得した商品データ:", product);

            // ✅ お気に入りボタンの処理
            setupFavoriteButton(product);
        })
        .catch(error => console.error("❌ JSONデータの取得に失敗しました:", error));
});

// **✅ お気に入りボタンの処理**
function setupFavoriteButton(product) {
    const favoriteBtn = document.querySelector(".favorite-btn");

    if (!favoriteBtn) {
        console.error("❌ favorite-btn が見つかりません");
        return;
    }

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // ✅ 既にお気に入り登録済みか判定
    const isFavorite = favorites.some(fav => fav.id === product.id);
    updateFavoriteButton(favoriteBtn, isFavorite);

    // ✅ ボタンクリック時の処理
    favoriteBtn.addEventListener("click", function () {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (favorites.some(fav => fav.id === product.id)) {
            // ✅ 既にお気に入りの場合、削除
            favorites = favorites.filter(fav => fav.id !== product.id);
            updateFavoriteButton(favoriteBtn, false);
        } else {
            // ✅ お気に入りに追加
            favorites.push({
                id: product.id,
                name: product.name,
                brand: product.brand,
                price: product.price,
                image: product.images[0] // メイン画像
            });
            updateFavoriteButton(favoriteBtn, true);
        }

        // ✅ ローカルストレージに保存
        localStorage.setItem("favorites", JSON.stringify(favorites));
    });
}

// **✅ お気に入りボタンの状態を更新**
function updateFavoriteButton(button, isFavorite) {
    if (isFavorite) {
        button.classList.add("active");
        button.innerHTML = `<i class="fa-solid fa-heart"></i> お気に入り解除`;
    } else {
        button.classList.remove("active");
        button.innerHTML = `<i class="fa-regular fa-heart"></i> お気に入りに追加`;
    }
}