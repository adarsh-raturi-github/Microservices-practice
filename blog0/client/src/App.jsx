import { useState } from "react";
import "./App.css";
import "./styles.css";
import PostCreate from "./components/PostCreate";
import PostList from "./components/PostList";

function App() {
  return (
    <div className="app-container">
      <h2>Blog App</h2>
      <PostCreate />
      <hr></hr>
      <h3>Posts</h3>
      <PostList />
    </div>
  );
}

export default App;
