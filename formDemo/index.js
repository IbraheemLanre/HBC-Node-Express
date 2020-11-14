"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const qs = require("querystring");

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

const formPath = path.join(__dirname, "form.html")

const server = http.createServer((req,res) =>{
    
})