import React from "react";
import TeacherPanel from "./TeacherPanel.jsx";
import StudentPanel from "./StudentPanel.jsx";

function Dashboard({ role }) {
  return (
    <div>
      <h2>{role === "teacher" ? "Teacher Dashboard" : "Student Dashboard"}</h2>
      {role === "teacher" ? <TeacherPanel /> : <StudentPanel />}
    </div>
  );
}

export default Dashboard;
