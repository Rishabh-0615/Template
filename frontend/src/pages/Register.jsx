import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser, btnLoading } = UserData();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, mobile, password } = formData;
    registerUser(name, email, mobile, password, navigate);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <input 
          type="text" 
          name="name" 
          placeholder="Full Name" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.name}
          onChange={handleChange} 
          required 
        />
        
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.email}
          onChange={handleChange} 
          required 
        />
        
        <input 
          type="tel" 
          name="mobile" 
          placeholder="Mobile Number" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.mobile}
          onChange={handleChange} 
          required 
        />
        
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.password}
          onChange={handleChange} 
          required 
        />

        <button 
          type="submit" 
          disabled={btnLoading} 
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          {btnLoading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span 
            onClick={() => navigate("/login")} 
            className="text-blue-500 cursor-pointer hover:text-blue-600 hover:underline"
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;