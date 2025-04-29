document.addEventListener("DOMContentLoaded", function () {
  const laptop = document.getElementById("laptop");
  const database = document.getElementById("database");
  const reactLogo = document.getElementById("react-logo");
  const nodejsLogo = document.getElementById("nodejs-logo");
  const cloud = document.getElementById("cloud");

  laptop.addEventListener("mouseenter", function () {
    const codeLines = document.querySelectorAll(".code-line");
    codeLines.forEach((line) => {
      line.style.animation = "none";
      setTimeout(() => {
        line.style.animation = "typing 3s steps(40, end) forwards";
      }, 10);
    });
  });

  const floatingSymbols = document.querySelectorAll(".floating-symbol");
  floatingSymbols.forEach((symbol) => {
    symbol.addEventListener("click", function () {
      this.style.transform = "scale(1.2)";
      setTimeout(() => {
        this.style.transform = "";
      }, 300);
    });
  });
});
