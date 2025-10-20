import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotUser, btnLoading } = UserData();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotUser(email, navigate);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your registered email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" disabled={btnLoading} className="btn-primary w-full mt-4">
          {btnLoading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
