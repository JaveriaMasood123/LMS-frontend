import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // change when deployed
});

// ✅ Register User
export const registerUser = async (userData) => {
  try {
    console.log("Register Request:", userData);
    const res = await API.post("/auth/register", userData, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("Register Error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Login User
export const loginUser = async (userData) => {
  try {
    const res = await API.post("/auth/login", userData, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Courses
const BASE_URL = "http://localhost:5000/api";

export const fetchCourses = async () => {
  const res = await fetch(`${BASE_URL}/courses`);
  return res.json();
};

export const addCourseAPI = async (courseTitle) => {
  const res = await fetch(`${BASE_URL}/courses/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: courseTitle }),
  });
  return res.json();
};

export const deleteCourseAPI = async (courseId) => {
  const res = await fetch(`${BASE_URL}/courses/${courseId}`, {
    method: "DELETE",
  });
  return res.json();
};

// ✅ Students
export const enrollCourse = async (studentId, courseId) => {
  const res = await fetch(`${BASE_URL}/students/${studentId}/enroll`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ courseId }),
  });
  return res.json();
};

export const getStudents = async () => {
  const res = await fetch(`${BASE_URL}/students`);
  return res.json();
};
