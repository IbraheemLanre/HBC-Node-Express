"use strict";

const path = require("path");
const { read } = require("../library/handlers");
const jsonPath = path.join(__dirname, "iceCream.json");

const getAllFlavors = async () => {
  try {
    const data = await read(jsonPath);
    const iceCreams = await JSON.parse(data.fileData);
    return Object.keys(iceCreams);
  } catch (err) {
    return [];
  }
};

const hasFlavor = async (flavor) => {
  try {
    const data = await read(jsonPath);
    const iceCreams = JSON.parse(data.fileData);
    return Object.keys(iceCreams).includes(flavor);
  } catch (err) {
    return false;
  }
};

const getIceCream = async (flavor) => {
  try {
    const data = await read(jsonPath);
    const iceCreams = JSON.parse(data.fileData);
    return iceCreams[flavor] || null;
  } catch (err) {
    return null;
  }
};

module.exports = { getAllFlavors, hasFlavor, getIceCream };
