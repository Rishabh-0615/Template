import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, btnLoading } = UserData();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(formData.email, formData.password, navigate);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        <input type="email" name="email" placeholder="Email" className="input" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="input" onChange={handleChange} required />

        <button type="submit" disabled={btnLoading} className="btn-primary w-full mt-4">
          {btnLoading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-4">
          <span onClick={() => navigate("/forgot-password")} className="text-blue-500 cursor-pointer">
            Forgot Password?
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
