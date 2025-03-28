document.addEventListener("DOMContentLoaded", function () {
    function setupHamburgerMenu() {
        const menuToggle = document.getElementById("menu-toggle");
        const closeMenu = document.getElementById("close-menu");
        const menu = document.getElementById("hamburger-menu");

        if (menuToggle && closeMenu && menu) {
            menuToggle.addEventListener("click", function () {
                menu.classList.add("open");
            });

            closeMenu.addEventListener("click", function () {
                menu.classList.remove("open");
            });
        } else {
            console.error("ハンバーガーメニューの要素が見つかりません");
        }
    }

    function setupMenuToggles() {
        const toggles = document.querySelectorAll(".menu-toggle");

        toggles.forEach(toggle => {
            toggle.addEventListener("click", function (event) {
                event.stopPropagation();
                let menuList = this.nextElementSibling;

                if (menuList && menuList.tagName === "UL") {
                    menuList.classList.toggle("open");
                } else {
                    console.warn("開閉対象のメニューが見つかりません:", this);
                }
            });
        });
    }

    function setupProductClickEvents() {
        // 商品カードを取得
        const productCards = document.querySelectorAll(".product-card");
        const rankingItems = document.querySelectorAll(".ranking-item");
        const saleItems = document.querySelectorAll(".sale-item");

        productCards.forEach((card, index) => {
            card.addEventListener("click", function () {
                const productId = `product-00${index + 1}`;
                window.location.href = `product_detail.html?id=${productId}`;
            });
        });

        rankingItems.forEach((item, index) => {
            item.addEventListener("click", function () {
                const productId = `product-00${index + 1}`;
                window.location.href = `product_detail.html?id=${productId}`;
            });
        });

        // SALEアイテムのクリック処理
        fetch("../JSON/product_data.json")
            .then(response => response.json())
            .then(data => {
                const saleProducts = data.products.filter(product => {
                    const productIdNum = parseInt(product.id.replace("product-", ""));
                    return productIdNum >= 8 && productIdNum <= 16;
                });

                saleItems.forEach((item, index) => {
                    if (index < saleProducts.length) {
                        const productId = saleProducts[index].id;
                        item.addEventListener("click", function () {
                            window.location.href = `product_detail.html?id=${productId}`;
                        });
                    }
                });
            })
            .catch(error => console.error("セール商品のデータ取得に失敗しました", error));
    }

    function loadHeader() {
        const header = document.querySelector("header");

        if (header.innerHTML.trim() === "") {
            fetch("../HTML/header.html")
                .then(response => response.text())
                .then(data => {
                    header.innerHTML = data;

                    setTimeout(() => {
                        setupHamburgerMenu();
                        setupMenuToggles();
                        setupProductClickEvents();
                    }, 0);
                })
                .catch(error => console.error("ヘッダーの読み込みに失敗しました", error));
        } else {
            setupHamburgerMenu();
            setupMenuToggles();
            setupProductClickEvents();
        }
    }

    loadHeader();
});