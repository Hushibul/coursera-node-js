const express = require("express");
const http = require("http");
const morgan = require("morgan");

const hostname = "localhost";
const port = 5000;

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.all("/dishes", (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  next();
});

app.get("/dishes", (req, res, next) => {
  res.end("We will send all the dishes to you!");
});
app.post("/dishes", (req, res, next) => {
  res.end(
    `We wiil add dishes with name: ${req.body.name} and description: ${req.body.description}`
  );
});
app.put("/dishes", (req, res, next) => {
  res.statusCode = 403;
  res.end("PUT request doesnot support in this format");
});
app.delete("/dishes", (req, res, next) => {
  res.end("We will delete all the dishes!");
});

app.get("/dishes/:dishId", (req, res, next) => {
  res.end("We will send you the dish with the id of " + req.params.dishId);
});
app.post("/dishes/:dishId", (req, res, next) => {
  res.statusCode = 403;

  res.end("POST request is not supported in this operation");
});
app.put("/dishes/:dishId", (req, res, next) => {
  res.end("We will update dish with the id of " + req.params.dishId);
});
app.delete("/dishes/:dishId", (req, res, next) => {
  res.end("We will delete the dish with this id " + req.params.dishId);
});

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
