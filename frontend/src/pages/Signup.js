import React, { useState } from "react";
import { useSignup } from "../Hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, isError, isLoading } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email", email, "Passeord", password);
    await signUp(email, password);

    console.log("There is error ", isError);
  };
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>
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
      <button disabled={isLoading}>Sign up</button>
      {isError && <div className="error">{isError}</div>}
    </form>
  );
};

export default Signup;
