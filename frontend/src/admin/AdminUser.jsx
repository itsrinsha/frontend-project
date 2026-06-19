import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/api.js";
import { FaUser, FaUserShield, FaLock, FaLockOpen, FaUsers, FaEye, FaEyeSlash } from "react-icons/fa";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users from backend
  const fetchUsers = async (page = 1, search = "") => {
    try {
      const res = await api.get(`/admin/users?page=${page}&limit=10&search=${search}`);
      const { users: fetchedUsers, pagination } = res.data;

      // Normalize name to always be a string
      const normalized = fetchedUsers.map((u) => {
        let displayName = "";
        if (typeof u.name === "string") {
          displayName = u.name;
        } else if (typeof u.name === "object" && u.name.name) {
          displayName = u.name.name;
        }
        return { ...u, displayName, id: u._id || u.id };
      });

      setUsers(normalized);
      setCurrentPage(pagination.currentPage);
      setTotalPages(pagination.totalPages);
      setTotalUsers(pagination.totalUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Toggle block/unblock
  const toggleBlock = async (user) => {
    try {
      await api.patch(`/admin/users/${user.id}/block`);
      fetchUsers(currentPage);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, searchTerm);
  }, [currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchUsers(1, searchTerm);
  };

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
              Total Users: <span className="text-blue-600 font-bold">{totalUsers}</span>
            </span>
          </div>
        </div>

        {/* Users Table Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <FaUserShield className="mr-3" />
              User Accounts Overview
            </h2>
            <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-2">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:bg-white/30 w-full md:w-64"
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Search
              </button>
            </form>
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
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${user.role === 'admin'
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
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${user.role === 'admin'
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : 'bg-green-100 text-green-800 border border-green-200'
                          }`}>
                          {user.role || "user"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${user.isBlocked
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : 'bg-green-100 text-green-800 border border-green-200'
                          }`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${user.isBlocked ? 'bg-red-500' : 'bg-green-500'
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
                          className={`inline-flex items-center px-4 py-2 rounded-xl font-semibold text-white transition-all duration-200 shadow-sm hover:shadow-md ${user.isBlocked
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 py-6 bg-gray-50 border-t border-gray-200">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
                  }`}
              >
                Previous
              </button>
              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all ${currentPage === i + 1
                      ? "bg-blue-600 text-white shadow-md scale-110"
                      : "bg-white text-gray-600 border hover:bg-gray-50"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
                  }`}
              >
                Next
              </button>
            </div>
          )}

          {/* Footer Stats */}
          {users.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Active: {users.filter(u => !u.isBlocked).length} (Page)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span>Blocked: {users.filter(u => u.isBlocked).length} (Page)</span>
                  </div>
                </div>
                <div className="text-gray-500">
                  Showing {users.length} user{users.length !== 1 ? 's' : ''} on page {currentPage} of {totalPages}
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