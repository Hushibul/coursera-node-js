const express = require("express");
const http = require("http");
const morgan = require("morgan");
const mongoose = require("mongoose");

const dishRouter = require("./routes/dishRouter");
const leaderRoute = require("./routes/leaderRoutes");
const promoRoute = require("./routes/promoRoute");

const hostname = "localhost";
const port = 5000;
const url = "mongodb://localhost:27017/confusion";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

mongoose
  .connect(url)
  .then((db) => console.log("Successfully connected to database!!!"))
  .catch((err) => console.log(err));

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
