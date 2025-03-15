document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("edit-form");
    const updateBtn = document.getElementById("update-btn");
    const passwordInput = document.getElementById("password");
    const passwordConfirmInput = document.getElementById("password_confirm");

    // 🔹 エラーメッセージ用の要素を作成
    const passwordRulesError = document.createElement("p");
    passwordRulesError.style.color = "red";
    passwordRulesError.style.display = "none";
    passwordInput.parentNode.insertBefore(passwordRulesError, passwordInput.nextSibling);

    // 🎯 生年月日のプルダウンを自動生成
    generateBirthdateOptions();

    updateBtn.addEventListener("click", function (event) {
        event.preventDefault(); // ✅ フォームの送信をブロック
        console.clear(); // コンソールをクリアして、毎回新しいログを見る

        // 各入力値を取得
        const lastName = document.getElementById("last-name").value.trim();
        const firstName = document.getElementById("first-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const year = document.getElementById("year").value;
        const month = document.getElementById("month").value;
        const day = document.getElementById("day").value;
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = passwordConfirmInput.value.trim();

        // 🔹 フォームが有効かどうかの判定フラグ
        let isValid = true;

        // 🔹 必須項目のチェック
        if (!lastName || !firstName || !email || !year || !month || !day) {
            alert("すべての項目を入力してください。");
            return;
        }
        if (!validateEmail(email)) {
            alert("有効なメールアドレスを入力してください。");
            return;
        }

        // 🔹 パスワードルールのチェック（パスワードが入力されている場合のみ）
        if (passwordValue !== "") {
            console.log("検証するパスワード:", passwordValue); // 🔍 デバッグ用

            if (!validatePassword(passwordValue)) {
                passwordRulesError.textContent = "※パスワードは8文字以上、大文字・小文字・数字・記号を1つ以上含めてください";
                passwordRulesError.style.display = "block";
                isValid = false;
            } else {
                passwordRulesError.style.display = "none";
            }
        }

        // 🔹 パスワード確認用チェック
        if (passwordValue !== "" && passwordValue !== confirmPasswordValue) {
            alert("パスワードが一致しません。");
            isValid = false;
        }

        // 🔹 バリデーションが1つでも失敗した場合、処理を中止
        if (!isValid) {
            console.log("🚨 バリデーションエラーがあるため処理を中止");
            return;
        }

        alert("会員情報が更新されました！");
        form.reset(); // ✅ 入力内容をリセット
    });

    // メールアドレスのバリデーション関数
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 🔹 パスワードのバリデーション関数（修正）
    function validatePassword(password) {
        console.log("パスワードバリデーションチェック:", password); // 🔍 デバッグ用

        if (password.length < 8) {
            console.log("エラー: 8文字未満");
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            console.log("エラー: 大文字が含まれていない");
            return false;
        }
        if (!/[a-z]/.test(password)) {
            console.log("エラー: 小文字が含まれていない");
            return false;
        }
        if (!/\d/.test(password)) {
            console.log("エラー: 数字が含まれていない");
            return false;
        }
        if (!/[\W_]/.test(password)) {
            console.log("エラー: 記号が含まれていない");
            return false;
        }

        console.log("✅ パスワードOK");
        return true;
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