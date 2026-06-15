const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const app = express();

app.use(express.json());
app.use(cors());
const posts = [];
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const { title } = req.body;
  const id = crypto.randomBytes(4).toString("hex");
  console.log("****", id);
  const data = { id, title };
  posts.push(data);
  res.status(201).send(data);
});
app.listen(4000, () => {
  console.log("Post server started");
  console.log("Listening on 4000");
});
