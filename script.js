const categoryButtons = document.querySelectorAll(".category");
const gameCards = document.querySelectorAll(".game-card");

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const selected = button.dataset.category;

        gameCards.forEach(card => {
            if (selected === "all" || card.dataset.category === selected) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });

    });
});

function openGame(page) {
    window.location.href = page;
}

function comingSoon() {
    alert("🔥 هذه اللعبة قادمة قريبًا!");
}