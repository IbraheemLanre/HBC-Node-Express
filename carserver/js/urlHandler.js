(function () {
  let searchCriterion;

  document.addEventListener("DOMContentLoad", init);

  function init() {
    searchCriterion = document.getElementById("searchCriterion");
    document.getElementById("sendUrl").addEventListener("click", update);
  }

  async function update() {
    try {
      const result = await fetch("/urlencoded", {
        method: "POST",
        body: `licence=${searchCriterion.value}`,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      updatePage(await result.json());
    } catch (err) {
      showError(err.message);
    }
  }
})();
