/**
 * ローカルストレージからデータを取得する関数
 * @param {string} key - ローカルストレージのキー
 * @returns {Array|Object} - 取得したデータ（空の場合は空の配列 or null）
 */
export function getDataFromStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

/**
 * ローカルストレージにデータを保存する関数
 * @param {string} key - ローカルストレージのキー
 * @param {Array|Object} data - 保存するデータ
 */
export function saveDataToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * カートデータを取得する関数（共通化）
 * @returns {Array} - カートのデータ
 */
export function getCart() {
    return getDataFromStorage("cart");
}

/**
 * カートデータを保存する関数（共通化）
 * @param {Array} cart - カートデータ
 */
export function saveCart(cart) {
    saveDataToStorage("cart", cart);
}

/**
 * 入力値が空かどうかチェックする関数
 * @param {string} value - 入力値
 * @returns {boolean} - 空なら `false` を返す
 */
export function isValidInput(value) {
    return value.trim() !== "";
}

/**
 * パスワードの一致チェック
 * @param {string} password - パスワード
 * @param {string} confirmPassword - 確認用パスワード
 * @returns {boolean} - 一致していれば `true`
 */
export function isPasswordMatch(password, confirmPassword) {
    return password === confirmPassword;
}

/**
 * メールアドレスのバリデーション
 * @param {string} email - メールアドレス
 * @returns {boolean} - 正しいフォーマットなら `true`
 */
export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * 生年月日の選択が正しいかチェック
 * @param {string} year - 年
 * @param {string} month - 月
 * @param {string} day - 日
 * @returns {boolean} - 正しい日付なら `true`
 */
export function isValidBirthDate(year, month, day) {
    if (!year || !month || !day) return false;
    const date = new Date(`${year}-${month}-${day}`);
    return date.getFullYear() == year && date.getMonth() + 1 == month && date.getDate() == day;
}

/**
 * パスワードのバリデーション
 * - 8文字以上
 * - 大文字・小文字を含む
 * - 数字を含む
 * - 特殊文字を含む
 * @param {string} password - パスワード
 * @returns {boolean} - 条件を満たしていれば `true`
 */
export function validatePassword(password) {
    return (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&  // 大文字
        /[a-z]/.test(password) &&  // 小文字
        /\d/.test(password) &&     // 数字
        /[\W_]/.test(password)      // 特殊文字
    );
}