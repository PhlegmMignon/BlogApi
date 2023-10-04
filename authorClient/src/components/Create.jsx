import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Create = () => {
  const [user, setUser] = useState(undefined);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [checked, setChecked] = useState(false);

  const [postSuccess, setPostSuccess] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/user", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
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

  const handleCheck = () => {
    setChecked(!checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postDetails = { title, content, checked };

    fetch("http://localhost:3000/create-post", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(postDetails),
    })
      .then(function (res) {
        return res.json();
      })
      .then((res) => {
        setPostSuccess(res.success);
      });
  };

  return (
    <div>
      {user ? (
        <div>
          <div>Create post</div>
          <form method="post" action="/create-post" onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              name="title"
              required
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
            <label htmlFor="content">Content</label>
            <input
              name="content"
              required
              onChange={(e) => setContent(e.target.value)}
              type="text"
            />
            <label htmlFor="publishStatus">Publish?</label>
            <input type="checkbox" checked={checked} onChange={handleCheck} />
            <button type="submit">Submit</button>
          </form>
          {postSuccess ? <div>Successfully posted!</div> : ""}
        </div>
      ) : (
        <div>Login to create posts</div>
      )}
      <div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default Create;
