// サイドバーHTMLを読み込んで挿入
fetch("sidebar.html")
  .then(response => response.text())
  .then(html => {
    const sidebarContainer = document.getElementById("sidebar-container");
    if (sidebarContainer) {
      sidebarContainer.innerHTML = html;

      // サイドバーメニューの開閉イベント
      const menuSection = document.querySelector(".menu-section");
      if (menuSection) {
        menuSection.addEventListener("click", event => {
          const header = event.target.closest(".menu-group-header");
          if (header) {
            const submenu = header.nextElementSibling;
            if (submenu && submenu.classList.contains("submenu")) {
              submenu.style.display =
                submenu.style.display === "block" ? "none" : "block";
            }
          }
        });
      }
    }
  })
  .catch(error => {
    console.error("サイドバーの読み込みに失敗しました:", error);
  });

// 顧客データの表示（仮データ使用）
document.addEventListener("DOMContentLoaded", () => {
  const customer = {
    id: 12345,
    email: "sample@example.com",
    phone: "+81 90 1234 5678",
    name: "山田 太郎",
    address: "東京都渋谷区神南1-1-1",
    orders: 4,
    total: 32500,
    payment: {
      card: "**** **** **** 4142",
      history: { count: 4, amount: 32500 },
      pending: { count: 1, amount: 5000 },
      region: { count: 4, amount: 32500 },
      deadline: { count: 1, amount: 5000 },
      refund: { count: 0, amount: 0 },
      grandTotal: 32500
    }
  };

  // 基本情報の表示
  document.getElementById("customer-id").textContent = `ID: ${customer.id}`;
  document.getElementById("customer-email-header").textContent = customer.email;
document.getElementById("customer-email-detail").textContent = customer.email;
  document.getElementById("customer-phone").textContent = customer.phone;
  document.getElementById("customer-name").textContent = customer.name;
  document.getElementById("customer-address").textContent = customer.address;
  document.getElementById("customer-orders").textContent = customer.orders;

  // 決済情報の表示
  document.getElementById("customer-card").textContent = customer.payment.card;
  document.getElementById("customer-history").textContent =
    `${customer.payment.history.count} (¥${customer.payment.history.amount.toLocaleString()})`;
  document.getElementById("customer-pending").textContent =
    `${customer.payment.pending.count} (¥${customer.payment.pending.amount.toLocaleString()})`;
  document.getElementById("customer-region").textContent =
    `${customer.payment.region.count} (¥${customer.payment.region.amount.toLocaleString()})`;
  document.getElementById("customer-deadline").textContent =
    `${customer.payment.deadline.count} (¥${customer.payment.deadline.amount.toLocaleString()})`;
  document.getElementById("customer-refund").textContent =
    `${customer.payment.refund.count} (¥${customer.payment.refund.amount.toLocaleString()})`;
  document.getElementById("customer-payment-total").textContent =
    `¥${customer.payment.grandTotal.toLocaleString()}`;
});