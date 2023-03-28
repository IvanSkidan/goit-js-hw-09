const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
const bodyEl = document.body;
let intervalId = null;

startBtn.disabled = false;

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  intervalId = setInterval(() => {
    getColorBody();
  }, 1000);
});


stopBtn.addEventListener("click", () => {
  startBtn.disabled = false;
  clearInterval(intervalId);
});

function getColorBody() {
  let randomHexColor = getRandomHexColor();
  bodyEl.style.backgroundColor = randomHexColor;
};

// Функція для генерування випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
