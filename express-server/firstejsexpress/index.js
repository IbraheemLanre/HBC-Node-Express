"use strict";

const http = require("http");
const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

const server = http.createServer(app);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pagetemplates"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const homePath = path.join(__dirname, "home.html");

app.get("/", (req, res) => res.sendFile(homePath));

app.post("/login", (req, res) => {
  if (!req.body) {
    res.statusCode(500);
  }
  res.render("result", {
    header: "Your data",
    title: "Form",
    data: req.body,
  });
});

server.listen(port, host, () =>
  console.log(`Server is listening to ${host}:${port}`)
);
