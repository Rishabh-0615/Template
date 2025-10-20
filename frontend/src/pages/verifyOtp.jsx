import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserData } from "../context/UserContext";

const VerifyOtp = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { verifyUser, btnLoading } = UserData();
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyUser(token, otp, navigate);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Verify OTP</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          className="input"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button type="submit" disabled={btnLoading} className="btn-primary w-full mt-4">
          {btnLoading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
