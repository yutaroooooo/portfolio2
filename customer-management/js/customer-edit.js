document.addEventListener("DOMContentLoaded", () => {
    // 仮データ：将来的にAPIやローカルデータに置き換え
    const customerData = {
      email: "sample@example.com",
      phone: "090-1234-5678",
      name: "田中 太郎",
      address: "東京都新宿区1-2-3",
    };
  
    // 値を埋め込む
    document.getElementById("email").value = customerData.email;
    document.getElementById("phone").value = customerData.phone;
    document.getElementById("name").value = customerData.name;
    document.getElementById("address").value = customerData.address;
  
    // フォーム送信時の処理
    document.querySelector(".edit-form").addEventListener("submit", (e) => {
      e.preventDefault();
  
      const updatedData = {
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        name: document.getElementById("name").value,
        address: document.getElementById("address").value,
      };
  
      console.log("保存されたデータ:", updatedData);
      alert("顧客情報を保存しました。");
      // 保存処理やAPI連携をここに追加
    });
  });