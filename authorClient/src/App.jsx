import "./App.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts", { mode: "cors" })
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <ul id="posts">
        {posts.map((post) => (
          <li className="post" key={post._id}>
            {post.title} {post.content}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
