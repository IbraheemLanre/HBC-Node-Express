"use strict";

const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const formPath = path.join(__dirname, "form.html");
const { port, host } = require("./config.json");
const { getUrlEncodedPostData } = require("./requestHandlerPost");

const server = http.createServer(async (req, res) => {
  const method = req.method.toUpperCase();
  if (method === "GET") {
    sendFile(res, formPath);
  } else if (method === "POST") {
    const formData = await getUrlEncodedPostData(req);
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(formData));
  }
});

server.listen(port, host, () => {
  console.log(`Server is listening to ${host}:${port}`);
});

async function sendFile(res, filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Content-Length": Buffer.byteLength(data, "utf8"),
    });
    res.end(data);
  } catch (err) {
    res.statusCode = 404;
    res.end(`Error: ${err.message}`);
  }
}
