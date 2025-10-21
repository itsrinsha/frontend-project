import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaUserShield, FaLock, FaLockOpen, FaUsers, FaEye, FaEyeSlash } from "react-icons/fa";

const AdminUser = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");

      // Normalize name to always be a string
      const normalized = res.data.map((u) => {
        let displayName = "";
        if (typeof u.name === "string") {
          displayName = u.name;
        } else if (typeof u.name === "object" && u.name.name) {
          displayName = u.name.name; // extract string if object
        }
        return { ...u, displayName };
      });

      setUsers(normalized);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Toggle block/unblock
  const toggleBlock = async (user) => {
    try {
      await axios.patch(`http://localhost:5000/users/${user.id}`, {
        isBlocked: !user.isBlocked,
      });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg">
              <FaUsers className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">User Management</h1>
          <p className="text-gray-600">Manage user accounts and access permissions</p>
          <div className="mt-4 bg-white inline-flex rounded-full px-4 py-2 shadow-sm border">
            <span className="text-sm font-medium text-gray-700">
              Total Users: <span className="text-blue-600 font-bold">{users.length}</span>
            </span>
          </div>
        </div>

        {/* Users Table Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <FaUserShield className="mr-3" />
              User Accounts Overview
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider text-center">#</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider text-center">Role</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider text-center">Status</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr 
                      key={user.id} 
                      className="hover:bg-gray-50 transition-all duration-200 group"
                    >
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                          <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                            <span className="text-sm font-medium text-gray-700">{index + 1}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                            user.role === 'admin' 
                              ? 'bg-purple-100 text-purple-600' 
                              : 'bg-blue-100 text-blue-600'
                          }`}>
                            <FaUser className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{user.displayName || 'Unnamed User'}</p>
                            <p className="text-xs text-gray-500">ID: {user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <p className="text-gray-700 truncate">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin'
                            ? 'bg-purple-100 text-purple-800 border border-purple-200'
                            : 'bg-green-100 text-green-800 border border-green-200'
                        }`}>
                          {user.role || "user"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${
                          user.isBlocked
                            ? 'bg-red-100 text-red-800 border border-red-200'
                            : 'bg-green-100 text-green-800 border border-green-200'
                        }`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            user.isBlocked ? 'bg-red-500' : 'bg-green-500'
                          }`}></div>
                          {user.isBlocked ? (
                            <span className="flex items-center">
                              <FaEyeSlash className="w-3 h-3 mr-1" />
                              Blocked
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <FaEye className="w-3 h-3 mr-1" />
                              Active
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => toggleBlock(user)}
                          className={`inline-flex items-center px-4 py-2 rounded-xl font-semibold text-white transition-all duration-200 shadow-sm hover:shadow-md ${
                            user.isBlocked
                              ? 'bg-green-500 hover:bg-green-600'
                              : 'bg-red-500 hover:bg-red-600'
                          }`}
                        >
                          {user.isBlocked ? (
                            <>
                              <FaLockOpen className="w-4 h-4 mr-2" />
                              Unblock
                            </>
                          ) : (
                            <>
                              <FaLock className="w-4 h-4 mr-2" />
                              Block
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                          <FaUsers className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-xl font-medium mb-2">No users found</p>
                        <p className="text-gray-400">There are no users to display at the moment.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Stats */}
          {users.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Active: {users.filter(u => !u.isBlocked).length}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span>Blocked: {users.filter(u => u.isBlocked).length}</span>
                  </div>
                </div>
                <div className="text-gray-500">
                  Showing {users.length} user{users.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUser;