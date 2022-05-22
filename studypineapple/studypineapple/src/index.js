import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./stylesheets/index.css";
import Header from "./components/Navbar";
import Home from "./components/home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Chat from "./components/rooms/Chat";
import Classpage from "./components/Classpage";
import Socket from "./components/rooms/Socket";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        {/*  <Route path="/signup" element={<Signup />} />*/}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/classpage" element={<Classpage />} />
        <Route path="/rooms" element={<Socket />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
