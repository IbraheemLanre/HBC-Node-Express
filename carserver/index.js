"use strict";

const http = require("http");
const path = require("path");
const config = require("./config.json");

const { redirectError } = require(path.join(
  __dirname,
  config.library.folder,
  "requestHandler.js"
));

const handleGetRequests = require(path.join(
  __dirname,
  config.library.folder,
  config.library.posthandler
));

const handlePostRequests = require(path.join(
  __dirname,
  config.library.folder,
  config.library.gethandler
))(__dirname, config);

const server = http.createServer((req, res) => {
  const method = req.method.toUpperCase();
  if (method === "GET") {
    handleGetRequests(req, res);
  } else if (method === "POST") {
    handlePostRequests(req, res);
  } else {
    redirectError(res, "Resouce not in use");
  }
});

server.listen(config.port, config.host, () => {
  console.log(`Server is running on ${config.host}:${config.port}`);
});
