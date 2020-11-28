"use strict";

const http = require("http");
const path = require("path");
const express = require("express");
const app = express();
const { port, host, storage } = require("./serverConfig.json");
const { createDataStorage } = require(path.join(
  __dirname,
  storage.storageFolder,
  storage.dataLayer
));

const dataStorage = createDataStorage();
const server = http.createServer(app);

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'pageviews'))
