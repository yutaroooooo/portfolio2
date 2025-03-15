document.addEventListener("DOMContentLoaded", function () {
    // お気に入りボタン
    const favoriteBtn = document.querySelector(".favorite-btn");
    const productName = document.getElementById("product-name");

    if (!favoriteBtn || !productName) return;

    // ローカルストレージからお気に入り状態を取得
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const productTitle = productName.textContent;

    if (savedFavorites.includes(productTitle)) {
        favoriteBtn.classList.add("active");
        favoriteBtn.innerHTML = `<i class="fa-solid fa-heart"></i> お気に入り解除`;
    }

    // ボタンクリック時の処理
    favoriteBtn.addEventListener("click", function () {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (favorites.includes(productTitle)) {
            // 既にお気に入りの場合、削除
            favorites = favorites.filter(item => item !== productTitle);
            favoriteBtn.classList.remove("active");
            favoriteBtn.innerHTML = `<i class="fa-regular fa-heart"></i> お気に入りに追加`;
        } else {
            // お気に入り追加
            favorites.push(productTitle);
            favoriteBtn.classList.add("active");
            favoriteBtn.innerHTML = `<i class="fa-solid fa-heart"></i> お気に入り解除`;
        }

        // ローカルストレージに保存
        localStorage.setItem("favorites", JSON.stringify(favorites));
    });
});