import "./App.css";
import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ToDo from "./ToDo";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" component={Home} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/todos" element={<ToDo />} />
      </Routes>
      {/* <Route path="*" element={<NotFound />}></Route> */}
    </div>
  );
}

export default App;
