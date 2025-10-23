(() => {
    const toggleBtn = document.getElementById("theme-toggle");

    const currentTheme = localStorage.getItem("theme") || "dark";
    document.body.classList.add(currentTheme);

    toggleBtn.addEventListener("click", () => {
        if (document.body.classList.contains("dark")) {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
            localStorage.setItem("theme", "light");
        } else {
            document.body.classList.remove("light");
            document.body.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    });
})();
(() => {
    // Тема
    const toggleBtn = document.getElementById("theme-toggle");

    // Установка темы из localStorage
    const currentTheme = localStorage.getItem("theme") || "dark";
    document.body.classList.add(currentTheme);

    toggleBtn.addEventListener("click", () => {
        if (document.body.classList.contains("dark")) {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
            localStorage.setItem("theme", "light");
        } else {
            document.body.classList.remove("light");
            document.body.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    });
})();
