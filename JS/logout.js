document.addEventListener("DOMContentLoaded", function () {
    // **ログアウトボタンだけを確実に取得**
    const logoutBtn = document.querySelector("button.logout-btn"); 
    const logoutPopup = document.getElementById("logout-popup");
    const popupOkBtn = document.getElementById("popup-ok-btn");
    const popupCancelBtn = document.getElementById("popup-cancel-btn");

    if (logoutBtn && logoutPopup) {
        // **ログアウトボタンのクリックでポップアップを表示**
        logoutBtn.addEventListener("click", function (event) {
            event.preventDefault();  // **デフォルトの動作を防ぐ**
            event.stopPropagation(); // **親要素へのイベント伝播を防ぐ**
            logoutPopup.style.display = "flex";
        });

        // **OKボタンでログアウト処理**
        popupOkBtn.addEventListener("click", function () {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "../HTML/mypage.html"; 
        });

        // **キャンセルボタンでポップアップを閉じる**
        popupCancelBtn.addEventListener("click", function () {
            logoutPopup.style.display = "none";
        });
    }

    // **誤動作防止！ ユーザーアイコンをクリックしたときはログアウト処理をしない**
    const userIconLink = document.querySelector("a[href='../HTML/mypage.html']");
    if (userIconLink) {
        userIconLink.addEventListener("click", function (event) {
            event.stopPropagation(); // **ログアウト処理が発火しないようにする**
        });
    }
});