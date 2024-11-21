const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors())

const PORT = 4000;
app.listen(PORT, (err) => {
  err
    ? console.log(`The server can't be started because of ${err}`)
    : console.log(`Server running on http://localhost:${PORT}`);
});

let requestCounter = 0;
const requestsPerSecondLimit = 50;

setInterval(() => (requestCounter = 0), 1000);

app.post("/api", (req, res) => {
  requestCounter++;

  if (requestCounter > requestsPerSecondLimit) {
    return res.status(429).send({ error: "Too many requests, try later." });
  }

  const { index } = req.body;
  if (!index || typeof index !== number) res.status(400).json("")
  const delay = Math.floor(Math.random() * 1000) + 1;

  setTimeout(() => {
    res.json({ index });
  }, delay);
});

app.use((_, res) => {
  res.status(404).json("Not found");
});

