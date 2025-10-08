import axios from "axios";

// ✅ Base URL setup: Now strictly relies on the Vercel Environment Variable.
//    The local default value is removed to prevent http://localhost:5000/ calls 
//    after deployment.
const BASE_URL = import.meta.env.VITE_API_URL; 

const API = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ✅ Auth
export const registerUser = async (userData) => {
  const res = await API.post("/auth/register", userData);
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await API.post("/auth/login", userData);
  return res.data;
};

// ✅ Courses
export const fetchCourses = async () => {
  const res = await API.get("/courses");
  return res.data;
};

export const addCourseAPI = async (courseTitle) => {
  const res = await API.post("/courses/add", { title: courseTitle });
  return res.data;
};

export const deleteCourseAPI = async (courseId) => {
  const res = await API.delete(`/courses/${courseId}`);
  return res.data;
};

// ✅ Students
export const getStudents = async () => {
  const res = await API.get("/students");
  return res.data;
};

export const enrollCourse = async (studentId, courseId) => {
  const res = await API.post(`/students/${studentId}/enroll`, { courseId });
  return res.data;
};
