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

const users = {
  matt: "1234",
  mary: "secret",
  jesse: "xyz",
};

app.get("/", (req, res) => res.sendFile(homePath));

app.post("/login", (req, res) => {
  if (!req.body) {
    res.statusCode(500);
  } else {
    const { username, password } = req.body;
    console.log(username, password);
    if (Object.keys(users).includes(username) && users[username] === password) {
      res.render("result", {
        header: "Your submitted data",
        title: "Form",
        data: req.body,
      });
    } else {
      res.render("errorpage", { username });
    }
  }
});

app.get("/users", (req, res) => {
  res.render("users", {
    headerA: "Names",
    title: "Users",
    usernames: Object.keys(users),
  });
});

server.listen(port, host, () =>
  console.log(`Server is listening to ${host}:${port}`)
);
