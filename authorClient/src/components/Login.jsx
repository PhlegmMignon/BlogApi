const Login = () => {
  return (
    <div id="login">
      <h1>Login</h1>
      <form action="" method="post">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="password">Password</label>
        <input type="text" id="password" name="password" />
      </form>
    </div>
  );
};

export default Login;
