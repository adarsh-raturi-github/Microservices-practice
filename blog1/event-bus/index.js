const { default: axios } = require("axios");
const express = require("express");
const app = express();
app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;
  console.log(event);
  // no await here using fire and forget principle for simplicity
  axios.post("http://posts-cluster-srv:4000/events", event);
  axios.post("http://comments-cluster-srv:4001/events", event);
  axios.post("http://query-cluster-srv:4002/events", event);
  axios.post("http://moderation-cluster-srv:4003/events", event);
  res.status(201).send("OK");
});

app.listen(4005, () => {
  console.log("Event bus started on port 4005");
});
