"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const qs = require("querystring");

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

const formPath = path.join(__dirname, "form.html");

const server = http.createServer((req, res) => {
  const method = req.method.toUpperCase();
  if (method === "GET") {
    fs.readFile(formPath, "utf-8", (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end(err.message);
      } else {
        res.writeHead(200, {
          "Content-Type": "text/html",
          "Content-Length": Buffer.byteLength(data, "utf-8"),
        });
        res.end(data);
      }
    });
  } else if (method === "POST") {
    if (req.headers["content-type"] != "application/x-www-form-urlencoded") {
      res.statusCode = 400;
      res.end("error");
    } else {
      const dataBuffer = [];
      req.on("data", (messageFragment) => dataBuffer.push(messageFragment));
      req.on("end", () => {
        let tempData = qs.parse(Buffer.concat(dataBuffer).toString());
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(tempData));
      });
      req.on("error", (err) => console.log("Erro:" + err.message));
    }
  }
});

server.listen(port, host, () => {
  console.log(`Server listening ${host}:${port}`);
});
