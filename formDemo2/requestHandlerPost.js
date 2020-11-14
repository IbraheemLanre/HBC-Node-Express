"use strict";

const qs = require("querystring");

const getUrlEncodedPostData = (req) => {
  new Promise((resolve, reject) => {
    if (req.headers["content-type"] != "application/x-www-form-urlencoded") {
      reject("Wrong Content-Type");
    } else {
      const dataBuffer = [];
      req.on("data", (messageFragment) => dataBuffer.push(messageFragment));
      req.on("end", () => {
        resolve(qs.parse(Buffer.concat(dataBuffer).toString()));
      });
      req.on("error", () => reject("Error during data transfer"));
    }
  });
};

module.exports = { getUrlEncodedPostData };
