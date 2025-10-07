import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center px-4"
      style={{
       backgroundImage: `linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80')`
      }}
    >
      <div className="text-center max-w-4xl">
        {/* Main Heading - Dark text */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
          Welcome to LMS
        </h1>
        
        {/* Subtitle - Dark text */}
        <p className="text-xl md:text-2xl mb-12 text-gray-700">
          Your Gateway to Smart Learning - Select your role to continue
        </p>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Teacher Card */}
          <Link 
            to="/teacher" 
            className=" backdrop-blur-md rounded-2xl p-8 border border-gray-300 hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group shadow-lg"
          >
            <div className="text-4xl mb-4">👨‍🏫</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">
              Teacher Dashboard
            </h3>
            <p className="text-gray-700">
              Manage courses, assignments, and track student progress
            </p>
          </Link>

          {/* Student Card */}
          <Link 
            to="/student" 
            className=" backdrop-blur-md rounded-2xl p-8 border border-gray-300 hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group shadow-lg"
          >
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">
              Student Dashboard
            </h3>
            <p className="text-gray-700">
              Access courses, submit assignments, and track your learning
            </p>
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/login"
            className="bg-gray-800 border-2 border-gray-800 hover:bg-gray-900 hover:border-gray-900 text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg w-full sm:w-auto text-center shadow-md"
          >
            🔑 Login to Account
          </Link>
          
          <Link 
            to="/register"
            className="bg-gray-800 border-2 border-gray-800 hover:bg-gray-900 hover:border-gray-900 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-110 w-full sm:w-auto text-center shadow-md"
          >
            📝 Create New Account
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-12">
          <p className="text-gray-800 text-sm">
            Join thousands of learners and educators in our smart learning ecosystem
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;