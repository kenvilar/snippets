document.addEventListener("DOMContentLoaded", () => {
  // Auto Update Current Year Text
  function kv_setCurrentYear() {
    const year = new Date().getFullYear();

    document.querySelectorAll(".year-today").forEach((el) => {
      el.textContent = year;
    });
  }
  kv_setCurrentYear();

  // Bold First or Last N Words via Data Attributes
  function kv_boldNWordsByDataAttributes() {
    function boldWords(el) {
      const text = (el.textContent || "").trim();
      if (!text) return;

      const words = text.split(/\s+/);

      const countAttr = el.getAttribute("data-word-to-bold");
      const fromAttr = (
        el.getAttribute("data-bold-from") || "start"
      ).toLowerCase();

      const count = Math.max(
        0,
        Math.min(parseInt(countAttr || "0", 10) || 0, words.length)
      );
      const from = fromAttr === "end" ? "end" : "start";

      let boldPart = [];
      let normalPart = [];

      if (from === "end") {
        normalPart = words.slice(0, words.length - count);
        boldPart = words.slice(words.length - count);

        // ✅ keep original order: normal first, bold last
        el.innerHTML =
          `${normalPart.join(" ")}` +
          (boldPart.length ? ` <strong>${boldPart.join(" ")}</strong>` : "");
      } else {
        boldPart = words.slice(0, count);
        normalPart = words.slice(count);

        // ✅ keep original order: bold first, normal last
        el.innerHTML =
          (boldPart.length ? `<strong>${boldPart.join(" ")}</strong>` : "") +
          (normalPart.length ? ` ${normalPart.join(" ")}` : "");
      }
    }

    document.querySelectorAll("[data-word-to-bold]").forEach(boldWords);
  }
  kv_boldNWordsByDataAttributes();
});
