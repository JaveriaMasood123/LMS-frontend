import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherPanel = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);

  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !courseId) {
      setMessage("⚠️ Please fill all fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("courseId", courseId);
      if (file) formData.append("file", file);

      const res = await axios.post(
        "http://localhost:5000/api/students/add",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage(res.data.msg);
      setName("");
      setEmail("");
      setFile(null);
      setCourseId("");
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
      setMessage("❌ Error adding student");
    }
  };

  const getCourseTitle = (student) => {
    if (!student.enrolledCourses || student.enrolledCourses.length === 0) return "No course";
    return student.enrolledCourses.map((c) => c.title).join(", ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center border border-gray-200">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">👩‍🏫 Teacher Dashboard</h2>
          <p className="text-gray-600 text-lg">Manage student enrollments and track progress</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Enroll Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Enroll New Student</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Student Name */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Student Name:</label>
                  <input 
                    type="text" 
                    placeholder="Enter student name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 bg-white"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Email:</label>
                  <input 
                    type="email" 
                    placeholder="Enter email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 bg-white"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Upload File:</label>
                  <input 
                    type="file" 
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {file && (
                    <p className="text-sm text-green-600 mt-2 font-medium">
                      📎 Selected file: {file.name}
                    </p>
                  )}
                </div>

                {/* Course Selection */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Select Course:</label>
                  <select
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 bg-white"
                  >
                    <option value="">-- Select a Course --</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition duration-300 transform hover:scale-105 shadow-lg text-lg"
                >
                  📚 Enroll Student
                </button>
              </form>

              {/* Message Display */}
              {message && (
                <div className={`mt-6 p-4 rounded-xl text-center font-semibold ${
                  message.includes("❌") || message.includes("⚠️")
                    ? "bg-red-100 text-red-700 border border-red-300" 
                    : "bg-green-100 text-green-700 border border-green-300"
                }`}>
                  {message}
                </div>
              )}
            </div>
          </div>

          {/* Students List Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">📜 Enrolled Students</h3>
              
              {students.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {students.map((student) => (
                    <div 
                      key={student._id}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition duration-300 bg-gray-50 hover:bg-white"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-gray-800 text-lg">{student.name}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Email: </span>
                        {student.email}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Course: </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {getCourseTitle(student)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-lg">No students enrolled yet.</p>
                  <p className="text-sm text-gray-400 mt-2">Enroll your first student to see them here</p>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">📊 Dashboard Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Total Students</span>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full font-bold">{students.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Available Courses</span>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full font-bold">{courses.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Active Enrollments</span>
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full font-bold">{students.length}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TeacherPanel;