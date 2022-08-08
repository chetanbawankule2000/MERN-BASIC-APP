import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const { dispatch } = useAuthContext();
  const login = async (email, password) => {
    setIsLoading(true);
    setIsError(null);
    const response = await fetch("http://localhost:4000/api/user/login", {
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
  return { login, isError, isLoading };
};
