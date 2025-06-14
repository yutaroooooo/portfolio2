window.addEventListener("DOMContentLoaded", () => {
  fetch("./sidebar.html")
    .then(response => {
      if (!response.ok) {
        throw new Error("サイドバーの読み込みに失敗しました");
      }
      return response.text();
    })
    .then(html => {
      document.getElementById("sidebar-container").innerHTML = html;

      // メニュー開閉用関数
      const toggleMenu = () => {
        const submenu = document.getElementById("submenu");
        const arrow = document.getElementById("arrow");
        const isOpen = submenu.style.display === "block";
        submenu.style.display = isOpen ? "none" : "block";
        arrow.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
      };
      window.toggleMenu = toggleMenu;

      // ★ここから：ページに応じて印を付ける
      const path = window.location.pathname.split('/').pop(); // ファイル名だけ取得

      const pageMappings = {
        "customer.html": "顧客一覧",
        "customer-detail.html": "顧客詳細",
        "customer-edit.html": "顧客情報編集"
      };

      const currentPage = pageMappings[path];

      if (currentPage) {
        const submenuItems = document.querySelectorAll("#submenu li");
        submenuItems.forEach(li => {
          if (li.textContent.trim() === currentPage) {
            li.classList.add("active");
            const mark = document.createElement("span");
            mark.textContent = "●"; // ここを好きなアイコンにしてもOK
            mark.style.color = "lime";
            mark.style.marginLeft = "8px";
            li.appendChild(mark);
          }
        });
      }
      // ★ここまで追加

    })
    .catch(error => {
      console.error(error);
      alert("サイドバーの読み込みに失敗しました");
    });
});