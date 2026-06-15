const express = require("express");
const crypto = require("crypto");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
const comments = [];

/** event bus listening event */
app.post("/events", async (req, res) => {
  const event = req.body;
  console.log("Received event", event.type);
  if (event.type == "CommentModerated") {
    const comment = comments.find((comment) => comment.id === event.data.id);
    if (comment) {
      comment.status = event.data.status;
      console.log("Comment Updated");
      await axios.post("http://event-bus-cluster-srv:4005/events", {
        type: "CommentUpdated",
        data: comment,
      });
    }
  }
  res.send({});
});

app.post("/posts/:id/comments", async (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;
  const comment = {
    id: crypto.randomBytes(4).toString("hex"),
    postId,
    content,
  };
  comments.push(comment);
  res.send(comment);
  console.log("Comment Created Event sent");

  /** on comment creation send event to event bus */
  await axios.post("http://event-bus-cluster-srv:4005/events", {
    type: "CommentCreated",
    data: comment,
  });
});

app.listen(4001, () => {
  console.log("Comments service started");
  console.log("port 4001");
});
