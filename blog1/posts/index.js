const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const app = express();
const axios = require("axios");

app.use(express.json());
app.use(cors());

const posts = [];

/** event bus listening event */
app.post("/events", (req, res) => {
  const event = req.body;
  console.log("Received event", event.type);
  res.send({});
});

app.get("/posts", (req, res) => {
  console.log("Get Posts");
  res.send(posts);
});

/** service routes */

app.post("/posts/create", async (req, res) => {
  const { title } = req.body;
  const id = crypto.randomBytes(4).toString("hex");
  const post = { id, title };
  res.status(201).send(post);
  posts.push(post);
  console.log("Post Created Event sent");
  /** on post creation send event to event bus */
  await axios.post("http://event-bus-cluster-srv:4005/events", {
    type: "PostCreated",
    data: post,
  });
});
app.listen(4000, () => {
  console.log("Post server started");
  console.log("Listening on 4000");
});
