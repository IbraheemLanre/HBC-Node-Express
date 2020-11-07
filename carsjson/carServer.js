"use strict";

const cars = require("./cars.json");
const http = require("http");
const { port, host } = require("./config");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charsert=utf-8" });
  res.end(createHtml(cars));
});

server.listen(port, host, () => {
  console.log(`Server ${host} is listening to  port: ${port}`);
});

const createHtml = (data) => {
  let htmlStr = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Car Data</title>
            <style>h1{color:blue}</style>
        </head>
        <body> 
            <h1>Cars</h1>
    `;
  for (let car of data) {
    htmlStr += `<h2>${car.model} ${car.licence} ${car.price}</h2>`;
  }
  htmlStr += `  </body>
    
    </html>`;
  return htmlStr;
};
