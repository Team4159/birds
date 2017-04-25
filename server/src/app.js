const express = require("express");
const app = express();
const path = require("path");

const middleware = require("./middleware.js");
const favicon = require("serve-favicon");
const api = require("./api");
const mongoose = require("mongoose");
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/birds-local");

app.use(middleware(process.env.NODE_ENV));

app.use(favicon(path.join(__dirname, "favicon.ico")));

app.use("/", express.static(path.join(__dirname, "../../web/build")));

app.use("/api", api);

// Returns main page on all others... used when calling "/login" or others
app.use("*", express.static(path.join(__dirname, "../../web/build")));

app.set("JWT_SECRET", process.env.JWT_SECRET);

const listener = app.listen(process.env.PORT || 8000, () => {
    console.log("Server Started on Port:", listener.address().port);
});
