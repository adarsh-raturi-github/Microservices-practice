const express = require("express");
const crypto = require("crypto");
const axios = require("axios");

const app = express();

app.use(express.json());

/** event bus listening event */
app.post("/events", async (req, res) => {
  const event = req.body;
  console.log("Received event", event.type);
  if (event.type === "CommentCreated") {
    setTimeout(async () => {
      const status = event.data.content.includes("orange")
        ? "rejected"
        : "approved";

      console.log("Comment Moderated Complete");
      await axios.post("http://event-bus-cluster-srv:4005/events", {
        type: "CommentModerated",
        data: {
          ...event.data,
          status,
        },
      });
    }, 60000);
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Moderator service started");
  console.log("port 4003");
});
