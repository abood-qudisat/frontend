import React, { useEffect, useState } from "react";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import { Plus, Users, ClipboardList, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { get } from "../../WebService/RequestBuilder";

const InstructorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchCoursesByInstructor = async () => {
    const { success, data } = await get("/courses");

    if (success) {
      // Process the data as needed
      const courses = data.filter((course) => course.instructor_id == user.id);
      console.log("Fetched courses:", courses);

      setCourses(courses);
    }
  };

  useEffect(() => {
    // Fetch courses when the component mounts
    fetchCoursesByInstructor();
  }, []);

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
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Welcome back, {user.name.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-600 mb-8">
            Manage your courses, track progress, and engage with your students.
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-emerald-100 text-emerald-800 p-5 rounded-xl shadow">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-6 h-6" />
                <h2 className="text-lg font-semibold">Courses</h2>
              </div>
              <p className="text-2xl font-bold">{courses?.length}</p>
            </div>
          </div>

          {/* Courses as Cards */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Courses
            </h2>
            <button
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium 
                                    hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                                    focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center
                                    transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed gap-5
                                    disabled:transform-none"
              onClick={() => navigate("/create-courses")}
            >
              <Plus className="w-4 h-4" />
              Create New
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl overflow-hidden shadow border hover:shadow-xl transition-all duration-300"
                onClick={() => navigate(`/course-instructor/${course.id}`)}
              >
                <div
                  className="h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${course.thumbnail_url})` }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {new Date(course.created_at).toLocaleDateString()}
                  </p>
                  <button
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium 
                                    hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                                    focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl 
                                    transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed gap-5
                                    disabled:transform-none"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
