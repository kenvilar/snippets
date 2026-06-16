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

  // Copy Elements Into Matching Targets by Data Attribute
  function kv_copyElementsToMatchingTargets() {
    // find all triggers like: <div data-copy-element-trigger="1">
    const triggers = Array.from(
      document.querySelectorAll("[data-copy-element-trigger]")
    );

    triggers.forEach((trigger) => {
      const key = trigger.getAttribute("data-copy-element-trigger");
      if (!key) return;

      // find matching target like: <div data-copy-element-target="1">
      const target = document.querySelector(
        `[data-copy-element-target="${CSS.escape(key)}"]`
      );
      if (!target) return;

      // avoid adding duplicate copies
      if (target.querySelector(`[data-copy-element-copy="${CSS.escape(key)}"]`))
        return;

      // clone the element (true = deep clone with children)
      const copy = trigger.cloneNode(true);

      // mark the clone so we can detect duplicates later
      copy.setAttribute("data-copy-element-copy", key);

      // append the cloned element into the target
      target.appendChild(copy);
    });
  }
  kv_copyElementsToMatchingTargets();

  // Copy Value/Text From One Element to Another by Matching Attribute Suffix
  function copyTextToMatchingTargets() {
    // Find every element that has ANY attribute that starts with "data-copy-text-"
    const sources = Array.from(document.querySelectorAll("*")).filter((el) =>
      Array.from(el.attributes).some((a) =>
        a.name.startsWith("data-copy-text-")
      )
    );

    sources.forEach((source) => {
      Array.from(source.attributes).forEach((attr) => {
        if (!attr.name.startsWith("data-copy-text-")) return;

        // suffix example: data-copy-text-unique1 -> unique1
        const key = attr.name.replace("data-copy-text-", "");
        if (!key) return;

        const target = document.querySelector(
          `[data-paste-text-${CSS.escape(key)}]`
        );
        if (!target) return;

        // copy attribute value (fallback to textContent if empty)
        const val = attr.value || source.textContent || "";
        target.textContent = val;
      });
    });
  }
  copyTextToMatchingTargets();
});
