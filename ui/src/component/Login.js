import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("test@123");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputHasError, setInputHasError] = useState(false);
  const navigate = useNavigate();

  // if already logged in then navigate to the home page
  useEffect(() => {
    const auth = localStorage.getItem("userId");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const loginHandler = async () => {
    // console.log(email, password);
    if (!email || !password) {
      setInputHasError(true);
      return;
    }

    try {
      let response = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        response = await response.json();
        localStorage.setItem("name", JSON.stringify(response.name));
        localStorage.setItem("userId", JSON.stringify(response.userId));
        localStorage.setItem("token", JSON.stringify(response.token));
        navigate("/");
      } else {
        throw new Error(response.message);
      }
      // console.log(response)
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        className="inputBox"
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      {!email && inputHasError && (
        <p className="error-text">Invalid Email/Username</p>
      )}
      <input
        className="inputBox"
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      {!password && inputHasError && (
        <p className="error-text">Invalid Password</p>
      )}
      <button className="myButton" onClick={loginHandler} type="button">
        Login
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Login;
