import { useState } from "react";
import axios from "axios";

const CommentCreateComponent = (props) => {
  const { postId } = props;
  const [comment, update] = useState("");

  const commentAdded = async (event) => {
    event.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content: comment,
    });
    update("");
  };
  return (
    <div>
      <form
        onSubmit={commentAdded}
        className="comment-create-form"
        style={{ display: "flex", gap: "8px" }}
      >
        <input
          value={comment}
          onChange={(e) => update(e.target.value)}
          placeholder="Add a comment"
          className="comment-input"
        />
        <button type="submit" className="button">
          Create
        </button>
      </form>
    </div>
  );
};
export default CommentCreateComponent;
