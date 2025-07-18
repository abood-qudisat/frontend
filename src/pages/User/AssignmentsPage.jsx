import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Calendar,
  Clock,
  ChevronRight,
  Filter,
  Search,
  CheckCircle,
  AlertCircle,
  FileText,
  Download,
  Upload,
  Eye,
  Edit3,
  Star,
  User,
  GraduationCap,
  Target,
} from "lucide-react";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import { get } from "../../WebService/RequestBuilder";
import { useAuth } from "../../contexts/AuthContext";

const AssignmentsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  const fetchUserEnrollments = async () => {
    try {
      setIsLoading(true);
      const { success, data } = await get(
        `/enrollments/users/${user.id}/enrollments`
      );

      if (success && data) {
        console.log("User enrollments:", data);
        setEnrolledCourses(data);

        // Extract course IDs from enrollments
        const courseIds = data.map((enrollment) => enrollment.course_id);

        if (courseIds.length > 0) {
          // Fetch assignments for enrolled courses
          await fetchAssignmentsForCourses(courseIds);
        } else {
          setAssignments([]);
        }
      } else {
        setError("Failed to fetch enrollments");
        setAssignments([]);
        setEnrolledCourses([]);
      }
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      setError("An error occurred while fetching your enrolled courses");
      setAssignments([]);
      setEnrolledCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAssignmentsForCourses = async (courseIds) => {
    try {
      // Fetch assignments for each enrolled course
      const assignmentPromises = courseIds.map((courseId) =>
        get(`/assignments/course/${courseId}`)
      );

      const assignmentResults = await Promise.allSettled(assignmentPromises);

      let allAssignments = [];

      assignmentResults.forEach((result, index) => {
        if (result.status === "fulfilled" && result.value.success) {
          const courseAssignments = result.value.data || [];

          // Add course information to each assignment
          const enrolledCourse = enrolledCourses.find(
            (course) => course.course_id === courseIds[index]
          );

          const enrichedAssignments = courseAssignments.map((assignment) => ({
            ...assignment,
            course_name: enrolledCourse?.course_name || "Unknown Course",
            instructor_name: enrolledCourse?.instructor_name || "Unknown Instructor",
            course_id: courseIds[index],
            // Map assignment status based on your API structure
            status: getAssignmentStatus(assignment),
            // Calculate days until due
            daysUntilDue: getDaysUntilDue(assignment.due_date),
            // Set default values for missing fields
            priority: assignment.priority || "medium",
            difficulty: assignment.difficulty || "Intermediate",
            tags: assignment.tags || [],
            attachments: assignment.attachments || [],
            estimatedTime: assignment.estimated_time || "N/A",
          }));

          allAssignments = [...allAssignments, ...enrichedAssignments];
        }
      });

      setAssignments(allAssignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      setError("Failed to fetch assignments");
    }
  };

  // Determine assignment status based on your API data structure
  const getAssignmentStatus = (assignment) => {
    if (assignment.is_submitted) {
      if (assignment.grade !== null && assignment.grade !== undefined) {
        return "completed";
      }
      return "submitted";
    }

    if (assignment.due_date) {
      const dueDate = new Date(assignment.due_date);
      const now = new Date();
      if (now > dueDate) {
        return "overdue";
      }
    }

    return "pending";
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserEnrollments();
    }
  }, [user?.id]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const filters = [
    { value: "all", label: "All", count: assignments.length },
    {
      value: "pending",
      label: "Pending",
      count: assignments.filter((a) => a.status === "pending").length,
    },
    {
      value: "submitted",
      label: "Submitted",
      count: assignments.filter((a) => a.status === "submitted").length,
    },
    {
      value: "completed",
      label: "Completed",
      count: assignments.filter((a) => a.status === "completed").length,
    },
    {
      value: "overdue",
      label: "Overdue",
      count: assignments.filter((a) => a.status === "overdue").length,
    },
  ];

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesFilter =
      selectedFilter === "all" || assignment.status === selectedFilter;
    const matchesSearch =
      assignment.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.course_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "submitted":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      case "overdue":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "submitted":
        return <Upload className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700 border border-green-200";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "Advanced":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-amber-500";
      case "low":
        return "text-emerald-500";
      default:
        return "text-gray-500";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysUntilDue = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return "📄";
      case "zip":
        return "📦";
      case "docx":
        return "📝";
      case "json":
        return "⚙️";
      default:
        return "📎";
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div
          className={`transition-all duration-300 ease-in-out pt-26 ${
            sidebarOpen ? "ml-0 lg:ml-64" : "ml-0 lg:ml-20"
          }`}
        >
          <div className="px-6 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              <span className="ml-3 text-gray-600">
                Loading your assignments...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`transition-all duration-300 ease-in-out pt-26 ${
          sidebarOpen ? "ml-0 lg:ml-64" : "ml-0 lg:ml-20"
        }`}
      >
        <div className="px-6 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              My Assignments
            </h1>
            <p className="text-gray-600 mb-6">
              Track your assignments from enrolled courses, manage deadlines, and
              submit your work seamlessly.
            </p>

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-600">{error}</p>
                <button
                  onClick={fetchUserEnrollments}
                  className="mt-2 text-red-600 hover:text-red-700 font-medium text-sm"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-2xl font-semibold text-gray-800">
                      {assignments.length}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-semibold text-amber-600">
                      {assignments.filter((a) => a.status === "pending").length}
                    </p>
                  </div>
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-semibold text-emerald-600">
                      {
                        assignments.filter((a) => a.status === "completed")
                          .length
                      }
                    </p>
                  </div>
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Overdue</p>
                    <p className="text-2xl font-semibold text-red-600">
                      {assignments.filter((a) => a.status === "overdue").length}
                    </p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Enrolled Courses Info */}
            {enrolledCourses.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 text-sm">
                  <strong>Enrolled Courses ({enrolledCourses.length}):</strong>{" "}
                  {enrolledCourses.map((course) => course.course_name).join(", ")}
                </p>
              </div>
            )}
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setSelectedFilter(filter.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedFilter === filter.value
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search assignments, courses, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Assignments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Assignment Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Star
                        className={`w-5 h-5 ${getPriorityColor(assignment.priority)}`}
                        fill="currentColor"
                      />
                      <h3 className="text-lg font-semibold text-gray-800">
                        {assignment.title || "Untitled Assignment"}
                      </h3>
                    </div>
                    <div
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        assignment.status
                      )}`}
                    >
                      {getStatusIcon(assignment.status)}
                      {assignment.status.charAt(0).toUpperCase() +
                        assignment.status.slice(1)}
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {assignment.course_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {assignment.instructor_name}
                      </p>
                    </div>
                  </div>

                  {/* Assignment Details */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Assignment
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                        assignment.difficulty
                      )}`}
                    >
                      {assignment.difficulty}
                    </span>
                    {assignment.estimatedTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {assignment.estimatedTime}
                      </span>
                    )}
                  </div>

                  {/* Due Date Info */}
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="flex items-center gap-1 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      Due {formatDate(assignment.due_date)}
                    </span>
                    {assignment.daysUntilDue !== null &&
                      assignment.status !== "overdue" && (
                        <span
                          className={`flex items-center gap-1 font-medium ${
                            assignment.daysUntilDue <= 3
                              ? "text-red-500"
                              : assignment.daysUntilDue <= 7
                              ? "text-amber-500"
                              : "text-emerald-500"
                          }`}
                        >
                          {assignment.daysUntilDue > 0
                            ? `${assignment.daysUntilDue} days left`
                            : assignment.daysUntilDue === 0
                            ? "Due today"
                            : `${Math.abs(assignment.daysUntilDue)} days overdue`}
                        </span>
                      )}
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {assignment.description || "No description available"}
                  </p>

                  {/* Grade Display */}
                  {assignment.grade !== null && assignment.grade !== undefined && (
                    <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">
                          Grade:
                        </span>
                      </div>
                      <span
                        className={`text-lg font-bold ${
                          assignment.grade >= 90
                            ? "text-emerald-600"
                            : assignment.grade >= 80
                            ? "text-blue-600"
                            : assignment.grade >= 70
                            ? "text-amber-600"
                            : "text-red-600"
                        }`}
                      >
                        {assignment.grade}/{assignment.max_points || 100}
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 ml-2">
                        <div
                          className={`h-2 rounded-full ${
                            assignment.grade >= 90
                              ? "bg-emerald-500"
                              : assignment.grade >= 80
                              ? "bg-blue-500"
                              : assignment.grade >= 70
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }`}
                          style={{
                            width: `${
                              (assignment.grade / (assignment.max_points || 100)) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Feedback */}
                  {assignment.feedback && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                      <p className="text-sm text-blue-800">
                        <strong>Instructor Feedback:</strong>{" "}
                        {assignment.feedback}
                      </p>
                    </div>
                  )}

                  {/* Tags */}
                  {assignment.tags && assignment.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {assignment.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Attachments */}
                  {assignment.attachments && assignment.attachments.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Attachments:
                      </p>
                      <div className="space-y-2">
                        {assignment.attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                          >
                            <span className="text-lg">
                              {getFileIcon(file.type)}
                            </span>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {file.size}
                              </p>
                            </div>
                            <button className="text-emerald-600 hover:text-emerald-700 text-sm">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="p-4 bg-gray-50 flex flex-wrap gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 rounded-lg transition-colors text-sm border border-gray-200">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>

                  {assignment.status === "pending" && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg transition-all duration-200 text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      <Upload className="w-4 h-4" />
                      Submit Work
                    </button>
                  )}

                  {assignment.status === "submitted" && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm">
                      <Edit3 className="w-4 h-4" />
                      Edit Submission
                    </button>
                  )}

                  {assignment.status === "completed" && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition-colors text-sm">
                      <Download className="w-4 h-4" />
                      Download Results
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAssignments.length === 0 && !isLoading && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="mb-4">
                <FileText className="w-16 h-16 text-gray-300 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No assignments found
              </h3>
              <p className="text-gray-600 mb-4">
                {enrolledCourses.length === 0
                  ? "You haven't enrolled in any courses yet."
                  : searchTerm
                  ? "Try adjusting your search terms or filters"
                  : "No assignments match the selected filter"}
              </p>
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedFilter("all");
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors mr-2"
                >
                  Clear Filters
                </button>
              )}
              {enrolledCourses.length === 0 && (
                <button
                  onClick={() => (window.location.href = "/courses")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Courses
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentsPage;
