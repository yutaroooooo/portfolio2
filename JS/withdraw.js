document.addEventListener("DOMContentLoaded", function () {
    const withdrawForm = document.getElementById("withdraw-form");

    withdrawForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // フォームのデフォルト送信を防ぐ

        // 入力値の取得
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const checkboxes = document.querySelectorAll("fieldset input[type='checkbox']");
        
        // すべてのチェックボックスがチェックされているか確認
        for (let checkbox of checkboxes) {
            if (!checkbox.checked) {
                alert("すべての確認事項にチェックを入れてください。");
                return;
            }
        }

        // 確認ダイアログ
        const isConfirmed = confirm("本当に退会しますか？この操作は取り消せません。");
        if (!isConfirmed) return;

        try {
            // 仮のAPIエンドポイント（バックエンドと連携する場合は修正）
            const response = await fetch("https://example.com/api/withdraw", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert("退会処理が完了しました。ご利用ありがとうございました。");
                window.location.href = "/index.html"; // トップページへリダイレクト
            } else {
                alert(`退会処理に失敗しました: ${data.message}`);
            }
        } catch (error) {
            console.error("退会処理エラー:", error);
            alert("エラーが発生しました。時間を置いて再試行してください。");
        }
    });
});