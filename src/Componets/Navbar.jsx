import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({currentUser,setHasAccess, setCurrentUser, isAdmin, setIsAdmin}) => {
  const  usenavigate=useNavigate();
  const handleLoginClicked=()=>{
   
  }
  const handleLogoutClicked=()=>{
    setCurrentUser(null);
    setHasAccess(false);
    setIsAdmin(false);
    localStorage.setItem("currentUser",null);
    usenavigate('/');
  }
  return (
    <div className="navbar">
      <Link className="logo" to="/"><h1>ImageBazar</h1></Link>
      {currentUser || isAdmin ? (
        <div class="upload-btn-wrapper">
          <button class="btn" onClick={handleLogoutClicked}>Logout</button>
        </div>
      ) : (
        <div class="upload-btn-wrapper">
        <Link to="/login">
          <button class="btn" onClick={handleLoginClicked}>
          Login
          </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
