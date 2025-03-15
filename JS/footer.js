window.addEventListener("load", function () {
    fetch("../HTML/footer.html") // ここを修正！
        .then(response => response.text())
        .then(data => {
            const footer = document.querySelector("footer"); // getElementById ではなく、footerタグを直接取得
            if (footer) {
                footer.innerHTML = data;
            } else {
                console.error("Error: <footer> element not found.");
            }
        })
        .catch(error => console.error("Error loading footer:", error));
});