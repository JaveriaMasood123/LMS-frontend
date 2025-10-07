import React, { useEffect, useState } from "react";
import { getStudents } from "../services/api.jsx";

function StudentDashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudents();
        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          console.error("Unexpected data format from API:", data);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg font-medium">Loading students...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center border border-gray-200">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">🎓 Student Dashboard</h2>
          <p className="text-gray-600 text-lg">View all enrolled students and their course information</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-blue-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">{students.length}</div>
            <div className="text-gray-600 font-medium">Total Students</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {students.filter(s => s.enrolledCourses?.length > 0).length}
            </div>
            <div className="text-gray-600 font-medium">Active Enrollments</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-purple-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {new Set(students.flatMap(s => s.enrolledCourses?.map(c => c.title) || [])).size}
            </div>
            <div className="text-gray-600 font-medium">Unique Courses</div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          {students.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-gray-500 text-xl mb-2">No students enrolled yet.</p>
              <p className="text-gray-400">Students will appear here once they are enrolled in courses.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <tr>
                    <th className="p-4 text-left rounded-tl-2xl">#</th>
                    <th className="p-4 text-left">Student Name</th>
                    <th className="p-4 text-left">Email Address</th>
                    <th className="p-4 text-left rounded-tr-2xl">Enrolled Courses</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {students.map((student, index) => (
                    <tr 
                      key={student._id} 
                      className="hover:bg-blue-50 transition duration-300"
                    >
                      <td className="p-4 font-semibold text-gray-700">{index + 1}</td>
                      <td className="p-4">
                        <div className="font-semibold text-gray-800">{student.name}</div>
                      </td>
                      <td className="p-4 text-gray-600">{student.email}</td>
                      <td className="p-4">
                        {student.enrolledCourses?.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {student.enrolledCourses.map((course, i) => (
                              <span 
                                key={i}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {course.title}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">No courses enrolled</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>🎯 Total of {students.length} students in the system</p>
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;