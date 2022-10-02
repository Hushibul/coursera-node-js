const express = require("express");
const http = require("http");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const dishRouter = require("./routes/dishRouter");
const leaderRoute = require("./routes/leaderRoutes");
const promoRoute = require("./routes/promoRoute");

const hostname = "localhost";
const port = 5000;
const url = "mongodb://localhost:27017/confusion";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("12345-67890-09876-54321"));

mongoose
  .connect(url)
  .then((db) => console.log("Successfully connected to database!!!"))
  .catch((err) => console.log(err));

//Authentication
function auth(req, res, next) {
  console.log(req.signedCookies);
  if (!req.signedCookies.user) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
      var err = new Error("You are not authenticated!");
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      next(err);
      return;
    }
    var auth = new Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");
    var user = auth[0];
    var pass = auth[1];
    if (user == "admin" && pass == "password") {
      res.cookie("user", "admin", { signed: true });
      next(); // authorized
    } else {
      var err = new Error("You are not authenticated!");
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      next(err);
    }
  } else {
    if (req.signedCookies.user === "admin") {
      next();
    } else {
      var err = new Error("You are not authenticated!");
      err.status = 401;
      next(err);
    }
  }
}

app.use(auth);

app.use("/dishes", dishRouter);
app.use("/promotions", promoRoute);
app.use("/leaders", leaderRoute);

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
