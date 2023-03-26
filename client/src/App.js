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

function App() {
  return (
    <>
      <Navbar />
      <div className="App pt-14">
        <Router>
          <Routes>
            <Route exact path="/" element={<Landing />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
