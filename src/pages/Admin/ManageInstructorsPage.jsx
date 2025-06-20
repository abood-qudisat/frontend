import React, { useState, useEffect } from "react";
import { Search, Eye, Pencil, Trash2, UserPlus, User } from "lucide-react";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import { useNavigate } from "react-router-dom";
import { get, del } from "../../WebService/RequestBuilder";

const ManageInstructorsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState(new Set());
  const navigate = useNavigate();

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
  const handleImageError = (instructorId) => {
    setImageErrors((prev) => new Set([...prev, instructorId]));
  };

  // Check if image should be shown
  const shouldShowImage = (instructor) => {
    return (
      instructor.avatar &&
      instructor.avatar.trim() !== "" &&
      !imageErrors.has(instructor.id) &&
      instructor.avatar !== "null" &&
      instructor.avatar !== "undefined"
    );
  };

  const filteredInstructors = instructors.filter(
    (instructor) =>
      instructor.name.toLowerCase().includes(search.toLowerCase()) ||
      instructor.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    if (deleteTarget) {
      try {
        const response = await del(`/users/${deleteTarget.id}`);
        if (response.success) {
          setInstructors(instructors.filter((i) => i.id !== deleteTarget.id));
          // Show success message if needed
        } else {
          // Handle error
          console.error("Failed to delete instructor");
        }
      } catch (error) {
        console.error("Error deleting instructor:", error);
      }
    }
    setDeleteTarget(null);
  };

  const fetchInstructors = async () => {
    setIsLoading(true);
    try {
      const { success, users } = await get("/users");

      if (success) {
        const instructorUsers = users.filter(
          (user) => user.role === "instructor"
        );
        setInstructors(instructorUsers);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching instructors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  // Avatar Component
  const InstructorAvatar = ({ instructor }) => {
    if (shouldShowImage(instructor)) {
      return (
        <img
          src={instructor.avatar}
          className="w-10 h-10 rounded-full border object-cover"
          alt={instructor.name}
          onError={() => handleImageError(instructor.id)}
        />
      );
    }

    // Fallback to initials
    return (
      <div
        className={`w-10 h-10 rounded-full border flex items-center justify-center text-white font-medium text-sm ${getAvatarColor(
          instructor.name
        )}`}
      >
        {getInitials(instructor.name)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} admin />

      <div
        className={`transition-all duration-300 ease-in-out pt-20 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <div className="px-6 py-10 max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Manage Instructors
            </h1>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search instructors..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border border-gray-300 pl-10 pr-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black"
                />
              </div>
              <button
                onClick={() => navigate("/add-instructor")}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Add Instructor
              </button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="bg-white shadow-md rounded-xl p-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                <span className="ml-3 text-gray-600">
                  Loading instructors...
                </span>
              </div>
            </div>
          ) : (
            /* Instructor Table */
            <div className="bg-white shadow-md rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm text-left text-gray-700">
                  <thead className="bg-gray-100 text-gray-600 font-medium">
                    <tr>
                      <th className="px-6 py-4">Instructor</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Joined</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInstructors.map((instructor) => (
                      <tr
                        key={instructor.id}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <InstructorAvatar instructor={instructor} />
                            <div>
                              <div className="font-medium text-gray-900">
                                {instructor.name || "N/A"}
                              </div>
                              <div className="text-xs text-gray-500">
                                ID: {instructor.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900">{instructor.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              instructor.is_active
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {instructor.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {instructor.created_at
                            ? new Date(instructor.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() =>
                                navigate(`/instructor-page/${instructor.id}`)
                              }
                              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                navigate(`/add-instructor/${instructor.id}`)
                              }
                              className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Edit Instructor"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              onClick={() => setDeleteTarget(instructor)}
                              title="Delete Instructor"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredInstructors.length === 0 && !isLoading && (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center justify-center text-gray-500">
                            <User className="w-12 h-12 mb-4 text-gray-300" />
                            <p className="text-lg font-medium mb-2">
                              No instructors found
                            </p>
                            <p className="text-sm">
                              {search
                                ? "Try adjusting your search criteria"
                                : "Get started by adding your first instructor"}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Summary Card */}
          {!isLoading && instructors.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Summary</h3>
                  <p className="text-sm text-gray-600">
                    Total: {instructors.length} instructors • Active:{" "}
                    {instructors.filter((i) => i.is_active).length} • Inactive:{" "}
                    {instructors.filter((i) => !i.is_active).length}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              Delete Instructor
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deleteTarget.name}</span>? This
              action cannot be undone and will affect all associated courses.
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

export default ManageInstructorsPage;
