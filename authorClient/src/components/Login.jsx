import { useState, useEffect } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [data, setData] = useState("");

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userCreds = { username: username, password: password };

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userCreds),
    }).then((res) => {
      console.log("Logging in..." + userCreds);
      console.log(res);
    });
    // .then((data) => setData(data));
  };

  return (
    <div id="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default Login;

//Either it's something to do with fetch or userCred format
