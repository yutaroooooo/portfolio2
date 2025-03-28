document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginError = document.getElementById("loginError");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // デフォルトの送信を防ぐ

        const enteredEmail = emailInput.value.trim();
        const enteredPassword = passwordInput.value.trim();

        // ✅ localStorage のデータを取得
        const storedUser = localStorage.getItem("registeredUser");

        console.log("✅ 入力されたメール:", enteredEmail);
        console.log("✅ 入力されたパスワード:", enteredPassword);
        console.log("✅ localStorage に保存されたデータ:", storedUser);

        if (!storedUser) {
            loginError.textContent = "エラー: ユーザーが登録されていません。";
            loginError.style.display = "block";
            return;
        }

        const userData = JSON.parse(storedUser); // JSONをオブジェクトに変換

        console.log("✅ 保存されたメール:", userData.email);
        console.log("✅ 保存されたパスワード:", userData.password);

        // 🔍 メールアドレスとパスワードのチェック
        if (userData.email === enteredEmail && userData.password === enteredPassword) {
            console.log("✅ ログイン成功");

            // ✅ ログイン成功時にフラグを保存
            localStorage.setItem("isLoggedIn", "true");

            // ✅ アカウントページへ遷移
            window.location.href = "../HTML/accountpage.html";
        } else {
            console.log("❌ ログイン失敗: メールまたはパスワードが一致しません");
            loginError.textContent = "メールアドレスまたはパスワードが間違っています。";
            loginError.style.display = "block";
        }
    });
});