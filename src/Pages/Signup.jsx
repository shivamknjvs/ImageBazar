// Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ setCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    // Check if the username already exists
    e.preventDefault();
    if (localStorage.getItem(username)) {
      alert("Username already exists. Please choose a different one.");
    } else {
      // Save user data to localStorage
      const hasAccess = false;
      const user = { username, password, hasAccess };
      localStorage.setItem(username, JSON.stringify(user));

      setCurrentUser(user);
      localStorage.setItem("currentUser", username);
      navigate("/");
    }
  };

  return (
    <div>
      <form class="login">
        <h2>Welcome, User!</h2>
        <p>Please Sign Up</p>
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
        <input type="submit" value="Sign Up" onClick={handleSignup} />
        <div class="links">
          <a href="#">Forgot password</a>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
