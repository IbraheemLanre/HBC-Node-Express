"use strict";

const http = require("http");
const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

const server = http.createServer(app);

const homePath = path.join(__dirname, "home.html");
const pageBPath = path.join(__dirname, "pageB.html");

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => res.sendFile(homePath));
app.get("/nextpage", (req, res) => res.sendFile(pageBPath));

server.listen(port, host, () => {
  console.log(`Server is listening to ${host}:${port}`);
});
