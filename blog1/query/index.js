const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const posts = {};

app.get("/query", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const event = req.body;
  console.log("Revecieved event", event.type);

  if (event.type == "PostCreated") {
    posts[event.data.id] = { title: event.data.title, comments: [] };
  } else if (event.type === "CommentCreated") {
    posts[event.data.postId]?.comments.push({
      id: event.data.id,
      content: event.data.content,
      status: "pending",
    });
  } else if (event.type === "CommentUpdated") {
    const postId = event.data.postId;
    const post = posts[postId];
    const comment = post.comments?.find(
      (comment) => comment.id === event.data.id,
    );
    comment.status = event.data.status;
    comment.content =
      event.data.status === "rejected"
        ? "This comment was removed because it violates our Community Guidelines. Please ensure all interactions are respectful"
        : comment.content;
  }
  res.send("OK");
});

app.listen(4002, () => {
  console.log("Query service started on 4002");
});
