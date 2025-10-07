import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === "teacher") {
      navigate("/teacher");
    } else {
      navigate("/student");
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.2)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80')`
      }}
    >
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-200">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Login As
            </label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 bg-white"
            >
              <option value="student">🎓 Student</option>
              <option value="teacher">👨‍🏫 Teacher</option>
            </select>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            🔑 Login to Account
          </button>

        </form>

        {/* Additional Links */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:text-blue-800 font-medium transition duration-300">
              Sign up here
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;