document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const createAccountBtn = document.getElementById("create-account-btn");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm_password");
    const passwordError = document.getElementById("passwordError");
    const registerPopup = document.getElementById("registerPopup");
    const popupOkBtn = document.getElementById("popupOkBtn");

    // 🔹 生年月日プルダウンの生成
    generateBirthdateOptions();

    createAccountBtn.addEventListener("click", function (event) {
        event.preventDefault(); // フォームのデフォルト送信を防ぐ

        const lastName = document.getElementById("last_name").value.trim();
        const firstName = document.getElementById("first_name").value.trim();
        const email = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();
        const year = document.getElementById("year").value;
        const month = document.getElementById("month").value;
        const day = document.getElementById("day").value;
        const gender = document.querySelector("input[name='gender']:checked")?.value;

        console.log("✅ 入力された情報:", { lastName, firstName, email, passwordValue, confirmPasswordValue, year, month, day, gender });

        let isValid = true; // ✅ フォームの有効性を判定

        // 🔹 必須項目チェック
        if (!lastName || !firstName || !email || !passwordValue || !confirmPasswordValue || !year || !month || !day || !gender) {
            alert("すべての項目を入力してください。");
            isValid = false;
        }

        // 🔹 メールアドレスのバリデーション
        if (!validateEmail(email)) {
            alert("有効なメールアドレスを入力してください。");
            isValid = false;
        }

        // 🔹 パスワードのバリデーション
        if (!validatePassword(passwordValue)) {
            passwordError.style.display = "block";
            isValid = false;
        } else {
            passwordError.style.display = "none";
        }

        // 🔹 パスワードの一致チェック
        if (passwordValue !== confirmPasswordValue) {
            alert("パスワードが一致しません。");
            isValid = false;
        }

        if (!isValid) return; // バリデーションNGなら処理を中断

        // ✅ localStorage にユーザー情報を保存
        localStorage.setItem("registeredUser", JSON.stringify({
            lastName,
            firstName,
            email,
            password: passwordValue,
            birthdate: `${year}-${month}-${day}`,
            gender
        }));
        console.log("✅ localStorage に保存:", localStorage.getItem("registeredUser"));

        // ✅ 登録完了ポップアップを表示
        registerPopup.style.display = "flex";
    });

    // 🔹 OKボタンを押したらアカウントページへ遷移
    popupOkBtn.addEventListener("click", function () {
        window.location.href = "../HTML/accountpage.html";
    });

    // 🔹 メールアドレスのバリデーション関数
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 🔹 パスワードのバリデーション関数
    function validatePassword(password) {
        return (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /\d/.test(password) &&
            /[\W_]/.test(password)
        );
    }

    // 🔹 生年月日プルダウン生成関数
    function generateBirthdateOptions() {
        const yearSelect = document.getElementById("year");
        const monthSelect = document.getElementById("month");
        const daySelect = document.getElementById("day");

        // 年（1900年〜今年）
        const currentYear = new Date().getFullYear();
        for (let y = currentYear; y >= 1900; y--) {
            let option = new Option(y, y);
            yearSelect.add(option);
        }

        // 月（1〜12）
        for (let m = 1; m <= 12; m++) {
            let option = new Option(m, m);
            monthSelect.add(option);
        }

        // 日（1〜31）
        updateDays();

        // 月を選択したら日付を更新
        yearSelect.addEventListener("change", updateDays);
        monthSelect.addEventListener("change", updateDays);

        function updateDays() {
            daySelect.innerHTML = ""; // 一旦リセット
            let selectedYear = parseInt(yearSelect.value);
            let selectedMonth = parseInt(monthSelect.value);
            if (!selectedYear || !selectedMonth) return;

            let daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
            for (let d = 1; d <= daysInMonth; d++) {
                let option = new Option(d, d);
                daySelect.add(option);
            }
        }
    }
});