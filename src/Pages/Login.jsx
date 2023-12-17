// Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    // Check if the user exists in localStorage
    e.preventDefault();
    console.log("username", username);
    console.log("helloooo", localStorage.getItem(username));
    const user = JSON.parse(localStorage.getItem(username));

    console.log(username);
    if (user && user.password === password) {
      localStorage.setItem("currentUser", username);
      setCurrentUser(username);
      navigate("/");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <form class="login">
      <h2>Welcome, User!</h2>
      <p>Please log in</p>
      <input
        type="text"
        placeholder="User Name"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      
      <input type="submit" value="Log In" onClick={handleLogin} />
      <div class="links">
      <Link to="/"> Admin Login</Link>
        <Link to="/signup"> Register</Link>

      </div>
    </form>
  );
};

export default Login;
