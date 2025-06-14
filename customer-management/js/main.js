document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("customerTableBody");
    const searchInput = document.getElementById("searchInput");

    // 顧客リストを表示する関数
    function renderCustomers(customersList) {
        tableBody.innerHTML = ""; // 一旦リセット

        customersList.forEach(customer => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="avatar.png" alt="Avatar"></td>
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td>${customer.orders}</td>
                <td>¥${customer.totalAmount.toLocaleString()}</td>
                <td>
                    <a href="customer-detail.html?id=${customer.id}">
                         <i class="fas fa-edit"></i>
                    </a>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // 検索機能
    searchInput.addEventListener("input", () => {
        const keyword = searchInput.value.toLowerCase();
        const filteredCustomers = customers.filter(customer =>
            customer.name.toLowerCase().includes(keyword) ||
            customer.email.toLowerCase().includes(keyword) ||
            customer.address.toLowerCase().includes(keyword)
        );
        renderCustomers(filteredCustomers);
    });

    // 初回ロード時に顧客データを表示
    renderCustomers(customers);
});