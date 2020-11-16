(function () {
  let iceCreamList;
  let resultArea;

  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    iceCreamList = document.getElementById("iceCreamList");
    resultArea = document.getElementById("resultArea");

    try {
      const data = await fetch("/all");
      const flavors = await data.json();
      populateIceCreamList(flavors);
    } catch (err) {
      showErrorMessage(err.message);
    }
  }

  function populateIceCreamList(queryResult) {
    if (!queryResult || queryResult.message) {
      showErrorMessage("Sorry, something went wrong");
    } else {
      for (let flavor of queryResult) {
        const option = document.createElement("option");
        option.value = flavor;
        option.textContent = flavor;
        iceCreamList.appendChild(option);
      }
      iceCreamList.addEventListener("change", choose);
      iceCreamList.value = "";
    }
  }

  async function choose() {
    const iceCreamFlavor = iceCreamList.value;
    if (iceCreamFlavor.length > 0) {
      try {
        const data = await fetch(`icecreams/${iceCreamFlavor}`);
        const result = await data.json();
        updateResult(result);
      } catch (err) {
        showErrorMessage(err.message);
      }
    } else {
      clearResultArea();
    }
  }

  function clearResultArea() {
    resultArea.innerHTML = "";
  }

  function updateResult(data) {
    if (!data) {
      showErrorMessage("Program error, sorry!");
    } else if (data.message) {
      showErrorMessage(data.message);
    } else if (data.name && data.name.length === 0) {
      clearResultArea();
    } else {
      let htmlStr = `
          <div>
          <p id="name">${data.name}</p>
          <p id="price">${data.price}</p>
          `;
      if (data.image && data.image.length > 0) {
        htmlStr += `<img src="/images/${data.image}"/>`;
      }
      resultArea.innerHTML = htmlStr;
    }
  }

  function showErrorMessage(message) {
    resultArea.innerHTML = `
        <div class="error>
            <h2>Error</h2>
            <p>${message}</p>
        </div>
      `;
  }
})();
