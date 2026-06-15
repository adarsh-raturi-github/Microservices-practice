const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
const comments = [];
app.post("/posts/:id/comments", (req, res) => {
  console.log("comments added");
  const { content } = req.body;
  const postId = req.params.id;
  const comment = {
    id: crypto.randomBytes(4).toString("hex"),
    postId,
    content,
  };
  comments.push(comment);
  res.send(comment);
});

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;

  const postComments = comments.filter((comment) => comment.postId == postId);
  res.status(201).send(postComments);
});

app.listen(4001, () => {
  console.log("Comments service started");
  console.log("port 4001");
});
