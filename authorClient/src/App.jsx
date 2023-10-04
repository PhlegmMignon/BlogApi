import "./App.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    fetch("http://localhost:3000/posts", { mode: "cors" })
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/user", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5173",
      },
    })
      .then(function (res) {
        return res.json();
      })
      .then((user) => {
        setUser(user);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <>
      {user ? (
        <div>
          <Link to="/create-post">Create post</Link>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
        </div>
      )}
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
