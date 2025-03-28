import { isEmpty, isPasswordMatch, isValidEmail, isValidBirthDate } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ register.js が読み込まれました");

    populateBirthDateOptions(); // ✅ 生年月日のプルダウンを生成

    const createAccountBtn = document.getElementById("create-account-btn");

    if (!createAccountBtn) {
        console.error("❌ create-account-btn が見つかりません");
        return;
    }

    createAccountBtn.addEventListener("click", () => {
        if (!validateForm()) {
            return; // バリデーションエラーがあれば処理を中断
        }

        // ✅ ユーザー情報を保存
        const lastName = document.getElementById("last_name").value;
        const firstName = document.getElementById("first_name").value;
        const email = document.getElementById("email").value;
        const passwordValue = document.getElementById("password").value;
        const year = document.getElementById("year").value;
        const month = document.getElementById("month").value;
        const day = document.getElementById("day").value;
        const gender = document.querySelector('input[name="gender"]:checked')?.value || "";

        console.log("🎉 登録情報:", { lastName, firstName, email, passwordValue, year, month, day, gender });

        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({ lastName, firstName, email, password: passwordValue, birthDate: `${year}-${month}-${day}`, gender });
        localStorage.setItem("users", JSON.stringify(users));

        alert("登録が完了しました！");
        window.location.href = "../HTML/accountpage.html";
    });
});

/**
 * フォームのバリデーションを行い、エラーがあればアラートを表示する
 * @returns {boolean} バリデーション成功なら `true`、エラーがあれば `false`
 */
function validateForm() {
    const lastName = document.getElementById("last_name").value;
    const firstName = document.getElementById("first_name").value;
    const email = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;
    const confirmPasswordValue = document.getElementById("confirm_password").value;
    const year = document.getElementById("year").value;
    const month = document.getElementById("month").value;
    const day = document.getElementById("day").value;

    let errorMessages = [];

    if (isEmpty(lastName)) {
        errorMessages.push("❌ 姓が入力されていません");
    }
    if (isEmpty(firstName)) {
        errorMessages.push("❌ 名が入力されていません");
    }
    if (!isValidEmail(email)) {
        errorMessages.push("❌ 無効なメールアドレスです");
    }
    if (!isPasswordMatch(passwordValue, confirmPasswordValue)) {
        errorMessages.push("❌ パスワードが一致しません");
    }
    if (!isValidBirthDate(year, month, day)) {
        errorMessages.push("❌ 生年月日が正しく選択されていません");
    }

    if (errorMessages.length > 0) {
        alert(errorMessages.join("\n")); // すべてのエラーをまとめて表示
        return false;
    }
    return true;
}

/**
 * 生年月日のプルダウンを生成する関数
 */
function populateBirthDateOptions() {
    const yearSelect = document.getElementById("year");
    const monthSelect = document.getElementById("month");
    const daySelect = document.getElementById("day");

    if (!yearSelect || !monthSelect || !daySelect) {
        console.error("❌ 生年月日選択の要素が見つかりません");
        return;
    }

    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 1900; y--) {
        let option = document.createElement("option");
        option.value = y;
        option.textContent = y;
        yearSelect.appendChild(option);
    }

    for (let m = 1; m <= 12; m++) {
        let option = document.createElement("option");
        option.value = m;
        option.textContent = m;
        monthSelect.appendChild(option);
    }

    function updateDays() {
        daySelect.innerHTML = "";
        const selectedYear = yearSelect.value;
        const selectedMonth = monthSelect.value;
        if (!selectedYear || !selectedMonth) return;

        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        for (let d = 1; d <= daysInMonth; d++) {
            let option = document.createElement("option");
            option.value = d;
            option.textContent = d;
            daySelect.appendChild(option);
        }
    }

    yearSelect.addEventListener("change", updateDays);
    monthSelect.addEventListener("change", updateDays);

    updateDays();
}