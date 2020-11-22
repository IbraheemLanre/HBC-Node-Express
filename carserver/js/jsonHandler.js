(function () {
  let searchCriterion;

  document.addEventListener("DOMContentLoad", init);

  function init() {
    searchCriterion = document.getElementById("searchCriterion");
    document.getElementById("sendJson").addEventListener("click", update);
  }

  async function update() {
    try {
      const result = await fetch("/jsonencoded", {
        method: "POST",
        body: JSON.stringify({ licence: searchCriterion.value }),
        header: {
          "Content-Type": "application/json",
        },
      });
      updatePage(await result.json());
    } catch (err) {
      showError(err.message);
    }
  }
})();
