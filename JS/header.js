document.addEventListener("DOMContentLoaded", function () {
    console.log("header.js loaded");

    function setupHamburgerMenu() {
        const menuToggle = document.getElementById("menu-toggle");
        const hamburgerMenu = document.getElementById("hamburger-menu");
        const closeMenu = document.getElementById("close-menu");

        if (menuToggle && hamburgerMenu && closeMenu) {
            menuToggle.addEventListener("click", function () {
                hamburgerMenu.classList.toggle("open");
            });

            closeMenu.addEventListener("click", function () {
                hamburgerMenu.classList.remove("open");
            });
        } else {
            console.error("❌ ハンバーガーメニューの要素が見つかりません");
        }
    }

    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        console.log("現在のログイン状態:", isLoggedIn);

        setTimeout(() => {
            const myPageLink = document.getElementById("mypage-link");
            if (myPageLink) {
                myPageLink.addEventListener("click", function (event) {
                    event.preventDefault();
                    window.location.href = isLoggedIn ? "../HTML/accountpage.html" : "../HTML/mypage.html";
                });
            } else {
                console.error("❌ 通常のマイページリンクが見つかりません");
            }

            const hamburgerMyPageBtn = document.getElementById("hamburger-mypage-btn");
            if (hamburgerMyPageBtn) {
                hamburgerMyPageBtn.addEventListener("click", function () {
                    window.location.href = isLoggedIn ? "../HTML/accountpage.html" : "../HTML/mypage.html";
                });
            } else {
                console.error("❌ ハンバーガーメニューのマイページボタンが見つかりません");
            }
        }, 500);
    }

    function setupCartButton() {
        const cartButton = document.getElementById("cart-link"); // カートボタン
        if (cartButton) {
            cartButton.addEventListener("click", function () {
                console.log("🛒 カートボタンがクリックされました");
                const cart = getCart();
                console.log("🛍 現在のカート:", cart);
            });
        } else {
            console.error("❌ カートボタンが見つかりません");
        }
    }

    function loadHeader() {
        const header = document.querySelector("header");

        if (header.innerHTML.trim() === "") {
            fetch("../HTML/header.html")
                .then(response => response.text())
                .then(data => {
                    header.innerHTML = data;
                    setupHamburgerMenu();
                    checkLoginStatus();
                    setupCartButton(); // ✅ カートボタンの処理を追加
                })
                .catch(error => console.error("❌ ヘッダーの読み込みに失敗しました", error));
        } else {
            setupHamburgerMenu();
            checkLoginStatus();
            setupCartButton(); // ✅ カートボタンの処理を追加
        }
    }

    loadHeader();
});

// **カートデータを取得**
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}