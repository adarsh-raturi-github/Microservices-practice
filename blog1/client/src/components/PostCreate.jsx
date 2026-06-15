import { useState } from "react";
import axios from "axios";
const PostCreate = () => {
  const [title, setTitle] = useState("");
  const submitForm = async (event) => {
    event.preventDefault();
    await axios.post("http://posts.com/posts/create", {
      title,
    });
    setTitle("");
  };

  return (
    <div className="post-create">
      <h4>Create Post</h4>
      <form onSubmit={submitForm} className="post-create-form">
        <div className="input-row">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="comment-input"
          />
          <button type="submit" className="button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostCreate;
