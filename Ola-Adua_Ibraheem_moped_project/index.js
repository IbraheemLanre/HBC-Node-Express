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
app.set("views", path.join(__dirname, "webpages"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const homePath = path.join(__dirname, "home.html");

app.get("/", (req, res) => res.sendFile(homePath));

app.get("/all", (req, res) =>
  dataStorage.getAll().then((data) =>
    res.render("allMopeds", {
      result: data.map((moped) => createMoped(moped)),
    })
  )
);

app.get("/getmoped", (req, res) => {
  res.render("getMoped", {
    title: "Get moped",
    header: "Get moped",
    action: "/getmoped",
  });
});

app.post("/getmoped", (req, res) => {
  if (!req.body) {
    res.statusCode(500);
  }
  let mopedId = req.body.mopedId;
  dataStorage
    .get(mopedId)
    .then((moped) =>
      res.render("mopedPage", {
        result: createMoped(moped),
      })
    )
    .catch((err) => sendErrorPage(res, err));
});

app.get("/addmoped", (req, res) => {
  res.render("form", {
    title: "Add Moped",
    header: "Add a moped",
    action: "/insert",
    mopedId: { value: "", readonly: "" },
    name: { value: "", readonly: "" },
    modelYear: { value: "", readonly: "" },
    topspeed: { value: "", readonly: "" },
    itemsInStock: { value: "", readonly: "" },
  });
});

app.post("/insert", (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    dataStorage
      .insert(createMoped(req.body))
      .then((status) => sendStatusPage(res, status))
      .catch((err) => sendErrorPage(res, err));
  }
});

app.get("/updateform", (req, res) => {
  res.render("form", {
    title: "Update Moped",
    header: "Update Data",
    action: "/updatedata",
    mopedId: { value: "", readonly: "" },
    name: { value: "", readonly: "readonly" },
    modelYear: { value: "", readonly: "readonly" },
    topspeed: { value: "", readonly: "readonly" },
    itemsInStock: { value: "", readonly: "readonly" },
  });
});

app.post("/updatedata", async (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  }
  dataStorage
    .get(req.body.mopedId)
    .then((moped) => createMoped(moped))
    .then((moped) =>
      res.render("form", {
        title: "Update Moped",
        header: "Update Moped",
        action: "/updatemoped",
        mopedId: { value: moped.mopedId, readonly: "readonly" },
        name: { value: moped.name, readonly: "" },
        modelYear: { value: moped.modelYear, readonly: "" },
        topspeed: { value: moped.topspeed, readonly: "" },
        itemsInStock: { value: moped.itemsInStock, readonly: "" },
      })
    )
    .catch((err) => sendErrorPage(res, err));
});

app.post("/updatemoped", (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    dataStorage
      .update(createMoped(req.body))
      .then((status) => sendStatusPage(res, status))
      .catch((err) => sendErrorPage(res, err));
  }
});

app.get("/removemoped", (req, res) => {
  res.render("getMoped", {
    title: "Remove Moped",
    header: "Remove Moped",
    action: "/removemoped",
  });
});

app.post("/removemoped", (req, res) => {
  if (!req.body) {
    res.statusCode(500);
  }
  const mopedId = req.body.mopedId;
  dataStorage
    .remove(mopedId)
    .then((status) => sendStatusPage(res, status))
    .catch((err) => sendErrorPage(res, err));
});

server.listen(port, host, () =>
  console.log(`Server is listening to ${host}:${port}`)
);

function sendErrorPage(res, err, tittle = "Error", header = "Error") {
  sendStatusPage(res, err, tittle, header);
}

function sendStatusPage(res, status, title = "Status", header = "Status") {
  return res.render("statusPage", { title, header, status });
}

function createMoped(moped) {
  return {
    mopedId: moped.mopedId,
    name: moped.name,
    modelYear: moped.modelYear,
    topspeed: moped.topspeed,
    itemsInStock: moped.itemsInStock,
  };
}
