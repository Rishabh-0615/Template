import React, { useEffect } from "react";
import { UserData } from "../context/UserContext";
import { Loader2, Trash2 } from "lucide-react";

const AdminDashboard = () => {
  const { allUsers, fetchAllUsers, deleteUser, loading } = UserData();

  // Fetch all users when the component mounts
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-semibold text-center text-green-700 mb-8">
          Admin Dashboard
        </h1>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin w-8 h-8 text-green-600" />
            <span className="ml-2 text-green-600 font-medium">Loading Users...</span>
          </div>
        ) : allUsers.length === 0 ? (
          <p className="text-center text-gray-600 font-medium">
            No users found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="py-3 px-4 border border-gray-200 text-left">#</th>
                  <th className="py-3 px-4 border border-gray-200 text-left">Name</th>
                  <th className="py-3 px-4 border border-gray-200 text-left">Email</th>
                  <th className="py-3 px-4 border border-gray-200 text-left">Mobile</th>
                  <th className="py-3 px-4 border border-gray-200 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="py-3 px-4 border border-gray-200">{index + 1}</td>
                    <td className="py-3 px-4 border border-gray-200">{user.name}</td>
                    <td className="py-3 px-4 border border-gray-200">{user.email}</td>
                    <td className="py-3 px-4 border border-gray-200">{user.mobile}</td>
                    <td className="py-3 px-4 border border-gray-200">
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
