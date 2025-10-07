import React, { useState } from "react";
import { registerUser } from "../services/api.jsx";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data before sending:", form);

    if (!form.name || !form.email || !form.password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await registerUser(form);
      alert("🎉 Registration successful!");
      console.log("Registered successfully:", res);
    } catch (err) {
      console.error("Register error:", err.response?.data || err);
      alert("❌ Error: " + (err.response?.data?.message || "Something went wrong"));
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-600">Join our learning community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              name="name"
              placeholder="Enter your full name"
              onChange={handleChange}
              value={form.name}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={form.email}
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
              name="password"
              type="password"
              placeholder="Create a strong password"
              onChange={handleChange}
              value={form.password}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
          </div>

          {/* Register Button */}
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-green-800 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            📝 Create Account
          </button>

        </form>

        {/* Additional Links */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium transition duration-300">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Security Note */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-700 text-xs text-center">
            🔒 Your information is secure and encrypted
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;