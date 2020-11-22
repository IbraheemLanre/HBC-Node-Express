"use strict";

function updatePage(cars) {
  const resultArea = document.getElementById("resultArea");
  resultArea.innerHTML = `
        <p>Model: ${cars[0].model}</p>
        <p>Licence: ${cars[0].licence}</p>
    `;
}

function showError(message) {
  const resultArea = document.getElementById(resultArea);
  resultArea.innerHTML = `
    <h1 class="error">Error</h1>
    <p class="error">${message}</p>
    `;
}
