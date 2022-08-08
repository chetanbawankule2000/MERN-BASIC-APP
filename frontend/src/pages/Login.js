import React, { useState } from "react";
import { useLogin } from "../Hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isError, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);

    console.log("Email", email, "Passeord", password);
  };
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button disabled={isLoading}>Login</button>
      {isError && <div className="error">{isError}</div>}
    </form>
  );
};

export default Login;