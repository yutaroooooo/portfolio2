document.addEventListener("DOMContentLoaded", () => {
    const editProfileLink = document.getElementById("edit-profile-link");

    if (editProfileLink) {
        editProfileLink.addEventListener("click", (event) => {
            event.preventDefault(); // デフォルトの遷移を防ぐ

            // ローカルストレージから住所データを取得
            let addresses = JSON.parse(localStorage.getItem("addresses")) || [];

            // 住所が登録されているか判定
            if (addresses.length > 0) {
                window.location.href = "edit_profile.html"; // 住所あり
            } else {
                window.location.href = "address.html"; // 住所なし
            }
        });
    }
});