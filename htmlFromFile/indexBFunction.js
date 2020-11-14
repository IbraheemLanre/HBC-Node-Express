"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const { port, host } = require("./config.json");
const docPath = path.join(__dirname, "home.html");

const server = http.createServer((req, res) => {
  sendFile(res, docPath);
});

server.listen(port, host, () => {
  console.log(`Server running on ${host}:${port}`);
});

// define data reading function ouside the creatserver function
async function sendFile(res, filePath) {
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Content-Length": Buffer.byteLength(data, "utf-8"),
    });
    res.end(data);
  } catch (err) {
    res.statusCode = 404;
    res.end(`Error: ${err.message}`);
  }
}
