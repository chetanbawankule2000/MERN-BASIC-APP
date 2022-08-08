import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const { dispatch } = useAuthContext();

  const signUp = async (email, password) => {
    console.log("Insdie signup ", email, password);
    setIsLoading(true);
    setIsError(null);
    const response = await fetch("http://localhost:4000/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setIsError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      //update context state
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      //   setIsError(null);
    }
  };

  return { signUp, isError, isLoading };
};
