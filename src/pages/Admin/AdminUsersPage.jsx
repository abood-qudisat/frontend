import { useState, useEffect } from "react";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import {
  Eye,
  Edit3,
  Trash2,
  Users,
  Search,
  UserPlus,
  User,
} from "lucide-react";
import { get, del } from "../../WebService/RequestBuilder";

const AdminManageUsersPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [imageErrors, setImageErrors] = useState(new Set());

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // Generate avatar colors based on name
  const getAvatarColor = (name) => {
    if (!name) return "bg-gray-500";
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-teal-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Handle image error
  const handleImageError = (userId) => {
    setImageErrors((prev) => new Set([...prev, userId]));
  };

  // Check if image should be shown
  const shouldShowImage = (user) => {
    return (
      user.avatar &&
      user.avatar.trim() !== "" &&
      !imageErrors.has(user.id) &&
      user.avatar !== "null" &&
      user.avatar !== "undefined"
    );
  };

  // Avatar Component
  const UserAvatar = ({ user }) => {
    if (shouldShowImage(user)) {
      return (
        <img
          src={user.avatar}
          className="w-10 h-10 rounded-full border object-cover"
          alt={user.name}
          onError={() => handleImageError(user.id)}
        />
      );
    }

    // Fallback to initials
    return (
      <div
        className={`w-10 h-10 rounded-full border flex items-center justify-center text-white font-medium text-sm ${getAvatarColor(
          user.name
        )}`}
      >
        {getInitials(user.name)}
      </div>
    );
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { success, users: userData } = await get("/users");

      if (success && userData) {
        setUsers(userData);
        setFilteredUsers(userData);
      } else {
        setError("Failed to fetch users");
        setUsers([]);
        setFilteredUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("An error occurred while fetching users");
      setUsers([]);
      setFilteredUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (deleteTarget) {
      try {
        const response = await del(`/users/${deleteTarget.id}`);
        if (response.success) {
          const updatedUsers = users.filter(
            (user) => user.id !== deleteTarget.id
          );
          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers.filter((user) => filterUser(user)));
        } else {
          console.error("Failed to delete user");
          alert("Failed to delete user. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user.");
      }
    }
    setDeleteTarget(null);
  };

  const filterUser = (user) => {
    const matchesSearch =
      search === "" ||
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(filterUser);
    setFilteredUsers(filtered);
  }, [search, roleFilter, users]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "instructor":
        return "bg-blue-100 text-blue-800";
      case "student":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (isActive) => {
    return isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  const getRoleCounts = () => {
    return {
      total: users.length,
      admin: users.filter((u) => u.role === "admin").length,
      instructor: users.filter((u) => u.role === "instructor").length,
      student: users.filter((u) => u.role === "student").length,
      active: users.filter((u) => u.is_active).length,
      inactive: users.filter((u) => !u.is_active).length,
    };
  };

  const counts = getRoleCounts();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} admin />

        <div
          className={`transition-all duration-300 ease-in-out pt-20 ${
            sidebarOpen ? "lg:ml-64" : "lg:ml-20"
          }`}
        >
          <div className="px-6 py-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              <span className="ml-3 text-gray-600">Loading users...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} admin />

      <div
        className={`transition-all duration-300 ease-in-out pt-20 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <div className="px-6 py-8 max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <Users className="w-8 h-8" />
                Manage Users
              </h1>
              <p className="text-gray-600 mt-1">
                Manage all system users and their roles
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">
                  {counts.total}
                </p>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {counts.admin}
                </p>
                <p className="text-sm text-gray-600">Admins</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {counts.instructor}
                </p>
                <p className="text-sm text-gray-600">Instructors</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {counts.student}
                </p>
                <p className="text-sm text-gray-600">Students</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border border-gray-300 pl-10 pr-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="instructor">Instructor</option>
                <option value="student">Student</option>
              </select>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">{error}</p>
              <button
                onClick={fetchUsers}
                className="mt-2 text-red-600 hover:text-red-700 font-medium text-sm"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Users Table */}
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-sm text-left text-gray-700">
                <thead className="bg-gray-100 text-gray-600 font-medium">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Joined</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <UserAvatar user={user} />
                          <div>
                            <div className="font-medium text-gray-900">
                              {user.name || "N/A"}
                            </div>
                            <div className="text-xs text-gray-500">
                              ID: {user.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getRoleColor(
                            user.role
                          )}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            user.is_active
                          )}`}
                        >
                          {user.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {formatDate(user.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            onClick={() => setDeleteTarget(user)}
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && !isLoading && (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <User className="w-12 h-12 mb-4 text-gray-300" />
                          <p className="text-lg font-medium mb-2">
                            No users found
                          </p>
                          <p className="text-sm">
                            {search || roleFilter !== "all"
                              ? "Try adjusting your search criteria"
                              : "No users are available"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Results Summary */}
          {filteredUsers.length > 0 && (
            <div className="text-sm text-gray-600 text-center">
              Showing {filteredUsers.length} of {users.length} users
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              Delete User
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deleteTarget.name}</span>? This
              action cannot be undone and will remove all associated data.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-md text-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-md text-sm bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageUsersPage;
