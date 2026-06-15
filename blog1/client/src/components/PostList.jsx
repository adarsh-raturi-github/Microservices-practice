import { useEffect, useState } from "react";
import axios from "axios";
import CommentCreateComponent from "./CommentCreate";
import CommentListComponent from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState({}); // object posts having comments also

  const fetchPosts = async () => {
    const res = await axios.get("http://posts.com/query"); // from query micro-service
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.entries(posts).map(([postId, post]) => {
    return (
      <div className="post-card" key={post.id}>
        <div className="card-body">
          <h4>{post.title}</h4>

          <div className="comment-list">
            <CommentListComponent comments={post.comments} />
          </div>

          <div className="comment-row">
            <CommentCreateComponent postId={postId} />
          </div>
        </div>
      </div>
    );
  });
  return <div className="post-grid">{renderedPosts}</div>;
};

export default PostList;
