import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentPanel from "./components/StudentPanel.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import "./App.css";

// Components
import Dashboard from "./components/Dashboard.jsx";
import TeacherPanel from "./components/TeacherPanel.jsx"; // ✅ Import added

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard routes */}
        <Route path="/teacher" element={<Dashboard role="teacher" />} />
        <Route path="/student" element={<Dashboard role="student" />} />

        {/* ✅ Separate route for Teacher Panel */}
        <Route path="/teacher-panel" element={<TeacherPanel />} />

      

      <Route path="/student-panel" element={<StudentPanel />} />

      </Routes>
    </Router>
  );
}

export default App;
