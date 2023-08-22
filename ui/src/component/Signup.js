import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [inputHasError, setInputHasError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate("/");
    }
  }, [navigate]);

  const signUpHandler = async () => {
    if(!name || !email || !password){
        setInputHasError(true);
        return;
    }

    try{
        let response = await fetch("http://127.0.0.1:5000/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
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
            throw new Error(response.message)
          }
    }catch(err){
        setErrorMessage(err.message);
    }
    
  };

  return (
    <div className="register">
      <h1>Registrer</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Name"
        onChange={(event) => setName(event.target.value)}
        value={name}
      />
      {!name && inputHasError && <p className="error-text">Invalid Name</p>}
      <input
        className="inputBox"
        type="email"
        placeholder="Enter Email/Username"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
      />
      {!email && inputHasError && <p className="error-text">Invalid Email/Username</p>}
      <input
        className="inputBox"
        type="password"
        placeholder="Enter Password"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
      />
      {!password && inputHasError && <p className="error-text">Invalid Password</p>}
      <button className="myButton" onClick={signUpHandler} type="button">
        SignUp
      </button>
      {errorMessage && <p className="error-text">{errorMessage}</p>}
    </div>
  );
};

export default SignUp;
