/**
 * カートデータを取得する関数
 * @returns {Array} ローカルストレージから取得したカートデータ（空の場合は空の配列）
 */
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

/**
 * カートデータを保存する関数
 * @param {Array} cart - カートデータ（オブジェクトの配列）
 */
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}