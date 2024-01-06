// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Navbar from "./Componets/Navbar";
import Footer from "./Componets/Footer";
import Admin from "./Componets/Admin";
const App = () => {
  
  const isLocalStorageEmpty = localStorage.length === 0;
  var user=null;
  console.log("isLocalStorage",(isLocalStorageEmpty));
   !(isLocalStorageEmpty || localStorage.getItem("currentUser"))? (user = localStorage.getItem("currentUser")) : null;
  
  console.log("type of user", (user))
  const [currentUser, setCurrentUser] = useState(user!="undefined"?user:null);
    const [hasAccess, setHasAccess] = useState(
    user != "admin" && user != null && user != "undefined"
      ? JSON.parse(localStorage.getItem(user)).hasAccess
      : null
  );
  const [isAdmin, setIsAdmin] = useState(false);


  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleSignup = (user) => {
    setCurrentUser(user);
  };
  console.log(currentUser);
  return (
    <Router>
      <Navbar
        currentUser={currentUser}
        setHasAccess={setHasAccess}
        setCurrentUser={setCurrentUser}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      ></Navbar>
      <Routes>
        <Route path="/login" element={<Login setCurrentUser={handleLogin} />} />
        <Route
          path="/signup"
          element={<Signup setCurrentUser={handleSignup} />}
        />
        <Route
          path="/"
          element={
            <Home
              currentUser={currentUser}
              setHasAccess={setHasAccess}
              hasAccess={hasAccess}
            />
          }
        ></Route>
        <Route path="/admin" element={<Admin setcurrentUser={setCurrentUser} setIsAdmin={setIsAdmin} />}>

        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
