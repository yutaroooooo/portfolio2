let addresses = JSON.parse(localStorage.getItem("addresses")) || [];

// 住所が登録されているか判定（簡潔化）
if (addresses) {
    console.log("✅ 登録済みの住所があります:", addresses);
}