document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ favorite_list.js が読み込まれました");

    displayFavoriteItems(); // お気に入りリストを表示
});

// ✅ お気に入りアイテムを表示
function displayFavoriteItems() {
    const favoriteContainer = document.getElementById("favorite-items-container");
    const noFavoritesMessage = document.getElementById("no-favorites-message");

    let favoriteItems = JSON.parse(localStorage.getItem("favorites")) || [];

    console.log("🛍 取得したお気に入りアイテム:", favoriteItems);

    if (favoriteItems.length === 0) {
        noFavoritesMessage.classList.remove("hidden");
        favoriteContainer.innerHTML = ""; // クリア
        return;
    }

    noFavoritesMessage.classList.add("hidden"); // メッセージを非表示
    favoriteContainer.innerHTML = ""; // 一旦クリア

    favoriteItems.forEach(item => {
        const itemCard = document.createElement("div");
        itemCard.classList.add("favorite-item");

        // ✅ 価格を数値に変換してからフォーマット
        const priceValue = parseInt(item.price.replace("¥", "").replace(",", ""), 10);
        const price = isNaN(priceValue) ? "価格不明" : `¥${priceValue.toLocaleString()}`;

        itemCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="favorite-item-image">
            <div class="favorite-item-info">
                <h3>${item.brand}</h3> <!-- ✅ ブランド -->
                <h3>${item.name}</h3> <!-- ✅ 商品名 -->
                <p>${price}</p> <!-- ✅ 価格を適切に表示 -->
                <button class="remove-favorite-btn" data-id="${item.id}">お気に入り解除</button>
            </div>
        `;

        favoriteContainer.appendChild(itemCard);
    });

    // ✅ お気に入り解除ボタンの処理
    document.querySelectorAll(".remove-favorite-btn").forEach(button => {
        button.addEventListener("click", event => {
            const productId = event.target.dataset.id;
            removeFavorite(productId);
        });
    });
}

// ✅ お気に入り解除処理
function removeFavorite(productId) {
    let favoriteItems = JSON.parse(localStorage.getItem("favorites")) || [];

    // ✅ 指定したIDの商品を除外
    favoriteItems = favoriteItems.filter(item => item.id !== productId);

    // ✅ 更新後のリストを保存
    localStorage.setItem("favorites", JSON.stringify(favoriteItems));

    console.log(`🗑️ 商品ID: ${productId} をお気に入りから削除しました`);

    // ✅ 再表示
    displayFavoriteItems();
}