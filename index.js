document.addEventListener("DOMContentLoaded", () => {
  // Auto Update Current Year Text (Vanilla JS)
  function setLMACurrentYear() {
    const year = new Date().getFullYear();

    document.querySelectorAll(".year-today").forEach((el) => {
      el.textContent = year;
    });
  }
  setLMACurrentYear();
});
