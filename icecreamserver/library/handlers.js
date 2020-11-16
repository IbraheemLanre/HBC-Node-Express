"use strict";

const fs = require("fs");
const path = require("path");
const MIMETYPES = require("./mimetypes.json");

const read = (filePath) => {
  const extension = path.extname(filePath).toLowerCase();
  const mime = MIMETYPES[extension] || {
    type: "application/octet-stream",
    encoding: "binary",
  };
  return fs.promises
    .readFile(filePath, mime.encoding)
    .then((fileData) => ({ fileData, mime }))
    .catch((err) => err);
};

const send = (res, resource) => {
  res.writeHead(200, {
    "Content-Type": resource.mime.type,
    "Content-Length": Buffer.byteLength(
      resource.fileData,
      resource.mime.encoding
    ),
  });
  res.end(resource.fileData, resource.mime.encoding);
};

const sendJson = (res, jsonResource) => {
  const jsonData = JSON.stringify(jsonResource);
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(jsonData);
};

const sendError = (res, message, code = 404) => {
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message }));
};

const isIn = (route, ...routes) => {
  for (let start of routes) {
    if (route.startsWith(start)) {
      return true;
    }
  }
  return false;
};

module.exports = { read, send, sendJson, sendError, isIn };
