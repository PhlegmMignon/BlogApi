import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Create = () => {
  const [user, setUser] = useState(undefined);

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

  return (
    <div>
      {user ? <div>form here</div> : <div>Login to create posts</div>}
      <div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default Create;
