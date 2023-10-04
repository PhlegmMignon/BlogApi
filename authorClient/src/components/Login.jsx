import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");

  // const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userCreds = { username: username, password: password };

    fetch("http://localhost:3000/login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(userCreds),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.user) {
          setLoginErr(false);
          window.location.replace("http://localhost:5173/");
        } else {
          setLoginErr(true);
        }
      });
  };

  return (
    <div id="login">
      <h1>Login</h1>
      {loginErr ? <div>Incorrent user/pass</div> : ""}
      <form onSubmit={handleSubmit} method="post" action="/post">
        <label htmlFor="username">Username</label>
        <input
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          id="username"
          name="username"
        />
        <label htmlFor="password">Password</label>
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          id="password"
          name="password"
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default Login;

//Either it's something to do with fetch or userCred format
