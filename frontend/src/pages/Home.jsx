import { UserData } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, isAuth, logout } = UserData();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mt-20">
      {isAuth ? (
        <>
          <h2 className="text-2xl font-semibold">Welcome, {user?.name}</h2>
          <button
            onClick={() => logout(navigate)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold">Welcome to User Portal</h2>
          <p className="mt-2 text-gray-600">Please login or register</p>
        </>
      )}
    </div>
  );
};

export default Home;
