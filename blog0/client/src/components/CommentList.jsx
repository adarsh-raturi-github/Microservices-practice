import { useEffect, useState } from "react";
import axios from "axios";
const CommentListComponent = (props) => {
  const { postId } = props;
  const [comments, updateList] = useState([]);

  const fetchComments = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`,
    );
    updateList(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
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
