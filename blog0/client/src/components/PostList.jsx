import { useEffect, useState } from "react";
import axios from "axios";
import CommentCreateComponent from "./CommentCreate";
import CommentListComponent from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4000/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    console.log("***");

    fetchPosts();
  }, []);

  const renderedPosts = posts.map((post) => {
    return (
      <div className="post-card" key={post.id}>
        <div className="card-body">
          <h4>{post.title}</h4>

          <div className="comment-list">
            <CommentListComponent postId={post.id} />
          </div>

          <div className="comment-row">
            <CommentCreateComponent postId={post.id} />
          </div>
        </div>
      </div>
    );
  });
  return <div className="post-grid">{renderedPosts}</div>;
};

export default PostList;
