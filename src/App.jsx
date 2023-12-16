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
  const [currentUser, setCurrentUser] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
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