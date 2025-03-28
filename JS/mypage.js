document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login-btn");
    const forgotPasswordLink = document.querySelector(".forgot-password"); // 🔹 追加
    const forgotPasswordPopup = document.getElementById("forgot-password-popup"); // 🔹 追加
    const resetEmailInput = document.getElementById("reset-email"); // 🔹 追加
    const resetPasswordInput = document.getElementById("reset-password"); // 🔹 追加
    const resetPasswordConfirmInput = document.getElementById("reset-password-confirm"); // 🔹 追加
    const resetPasswordBtn = document.getElementById("reset-password-btn"); // 🔹 追加
    const closePopupBtn = document.getElementById("close-popup-btn"); // 🔹 追加
    const resetErrorMessage = document.getElementById("reset-error-message"); // 🔹 追加

    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            const email = document.querySelector("input[name='email']").value.trim();
            const password = document.querySelector("input[name='password']").value.trim();
            const errorMessage = document.getElementById("error-message");

            const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

            if (!registeredUser) {
                errorMessage.textContent = "会員登録が完了していません。";
                errorMessage.style.display = "block";
                return;
            }

            if (email === "" || password === "") {
                errorMessage.textContent = "メールアドレスとパスワードを入力してください。";
                errorMessage.style.display = "block";
                return;
            }

            if (email !== registeredUser.email || password !== registeredUser.password) {
                errorMessage.textContent = "メールアドレスまたはパスワードが間違っています。";
                errorMessage.style.display = "block";
                return;
            }

            // ✅ ログイン成功時に localStorage に保存
            localStorage.setItem("isLoggedIn", "true");

            // ✅ アカウントページへ遷移
            window.location.href = "../HTML/accountpage.html";
        });
    }

    // 🔹 パスワードリセットの処理
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener("click", function (event) {
            event.preventDefault();
            forgotPasswordPopup.style.display = "flex"; // ポップアップを表示
        });
    }

    if (closePopupBtn) {
        closePopupBtn.addEventListener("click", function () {
            forgotPasswordPopup.style.display = "none"; // ポップアップを閉じる
            resetEmailInput.value = "";
            resetPasswordInput.value = "";
            resetPasswordConfirmInput.value = "";
            resetErrorMessage.style.display = "none";
        });
    }

    if (resetPasswordBtn) {
        resetPasswordBtn.addEventListener("click", function () {
            const email = resetEmailInput.value.trim();
            const newPassword = resetPasswordInput.value.trim();
            const confirmPassword = resetPasswordConfirmInput.value.trim();
            const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

            if (!email || !newPassword || !confirmPassword) {
                resetErrorMessage.textContent = "すべての項目を入力してください。";
                resetErrorMessage.style.display = "block";
                return;
            }

            if (!registeredUser || registeredUser.email !== email) {
                resetErrorMessage.textContent = "登録されていないメールアドレスです。";
                resetErrorMessage.style.display = "block";
                return;
            }

            if (newPassword !== confirmPassword) {
                resetErrorMessage.textContent = "パスワードが一致しません。";
                resetErrorMessage.style.display = "block";
                return;
            }

            // ✅ パスワードを更新
            registeredUser.password = newPassword;
            localStorage.setItem("registeredUser", JSON.stringify(registeredUser));
            alert("パスワードがリセットされました。ログインしてください。");

            // ✅ ポップアップを閉じる
            forgotPasswordPopup.style.display = "none";
        });
    }
});