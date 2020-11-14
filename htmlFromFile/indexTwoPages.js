"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const { port, host } = require("./config");

const homePath = path.join(__dirname, "home.html");
const pageAPath = path.join(__dirname, "pageA.html");

const server = http.createServer((req, res) => {
  const urlData = url.parse(req.url, true);
  const route = decodeURIComponent(urlData.pathname);

  if (route === "/") {
    sendFile(res, homePath);
  } else if (route === "/pagea") {
    sendFile(res, pageAPath);
  } else if (route.startsWith("/css/")) {
    console.log(route);
    console.log(path.join(__dirname, route));
    sendStyles(res, path.join(__dirname, route));
  } else {
    res.statusCode = 404;
    res.end("Error: Page Not Found");
  }
});

server.listen(port, host, () => {
  `Server is listening to ${host}:${port}`;
});

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

async function sendStyles(res, filePath) {
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    res.writeHead(200, {
      "Content-Type": "text/css",
      "Content-Length": Buffer.byteLength(data, "utf-8"),
    });
    res.end(data);
  } catch (err) {
    res.statusCode = 404;
    res.end(`Error: ${err.message}`);
  }
}
