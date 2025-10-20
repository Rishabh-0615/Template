import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);

  const BASE_URL = "http://localhost:8080/api";

  // REGISTER USER
  async function registerUser(name, email, mobile, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/user/register`, {
        name,
        email,
        mobile,
        password,
      });

      toast.success("OTP sent to your email");
      const token = data.token;
      setBtnLoading(false);
      navigate(`/verifyOtp/${token}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
      setBtnLoading(false);
    }
  }

  // VERIFY OTP
  async function verifyUser(token, otp, navigate) {
    setBtnLoading(true);
    try {
      if (!token) {
        toast.error("Invalid token");
        setBtnLoading(false);
        return;
      }

      const { data } = await axios.post(
        `${BASE_URL}/user/verifyOtp/${token}`,
        { otp: Number(otp) } // ensure OTP is a number
      );

      toast.success("Registration Successful");
      setUser(data.userEntity);
      setIsAuth(true);
      localStorage.setItem("user", JSON.stringify(data.userEntity));
      setBtnLoading(false);
      navigate("/"); // redirect to home
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
      setBtnLoading(false);
    }
  }

  // LOGIN
  async function loginUser(email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/user/login`, { email, password });

      toast.success("Login Successful");
      setUser(data.userEntity);
      setIsAuth(true);
      localStorage.setItem("user", JSON.stringify(data.userEntity));
      setBtnLoading(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
      setBtnLoading(false);
    }
  }

  // FORGOT PASSWORD
  async function forgotUser(email, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/user/forget`, { email });
      toast.success("OTP sent to your email");
      const token = data.token;
      setBtnLoading(false);
      navigate(`/reset-password/${token}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
      setBtnLoading(false);
    }
  }

  // RESET PASSWORD
  async function resetUser(token, otp, newPassword, navigate) {
    setBtnLoading(true);
    try {
      await axios.post(`${BASE_URL}/user/reset-password/${token}`, { otp: Number(otp), password: newPassword });
      toast.success("Password Reset Successful");
      setBtnLoading(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Password Reset Failed");
      setBtnLoading(false);
    }
  }

  // FETCH USER
  async function fetchUser() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/user/me/${storedUser.id}`);
      setUser(data);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user: ", error);
      setLoading(false);
      setIsAuth(false);
    }
  }

  // LOGOUT
  function logout(navigate) {
    setUser(null);
    setIsAuth(false);
    localStorage.removeItem("user");
    toast.info("Logged out");
    navigate("/login");
  }

  // ADMIN FUNCTIONS
  async function fetchAllUsers() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/admin/users`);
      setAllUsers(data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch users");
      setLoading(false);
      console.error(error);
    }
  }

  async function deleteUser(id) {
    try {
      const { data } = await axios.delete(`${BASE_URL}/admin/users/${id}`);
      toast.success(data);
      setAllUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      toast.error("Failed to delete user");
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuth,
        setIsAuth,
        btnLoading,
        loading,
        registerUser,
        verifyUser,
        loginUser,
        forgotUser,
        resetUser,
        logout,
        allUsers,
        fetchAllUsers,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
