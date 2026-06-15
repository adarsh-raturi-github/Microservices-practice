import { useEffect, useState } from "react";
import axios from "axios";
const CommentListComponent = (props) => {
  const { comments } = props;

  const renderedComments = comments.map((comment) => {
    const staus = comment.status;
    const isRejected = comment.status === "rejected";
    console.log(isRejected);
    return (
      <li key={comment.id}>
        <span
          style={{
            color: isRejected ? "red" : "black",
          }}
        >
          {comment.content}
        </span>
      </li>
    );
  });

  return (
    <ul>
      {renderedComments.length ? (
        renderedComments
      ) : (
        <li className="small-muted">No comments</li>
      )}
    </ul>
  );
};

export default CommentListComponent;
