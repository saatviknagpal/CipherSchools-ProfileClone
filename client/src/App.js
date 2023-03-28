import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Followers from "./components/Followers";
import ProfileView from "./components/ProfileView";

function App() {
  return (
    <>
      <Navbar />
      <div className="App pt-14">
        <Router>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/followers" element={<Followers />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/profile/:id" element={<ProfileView />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
