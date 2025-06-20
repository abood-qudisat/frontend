import React, { useState } from "react";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import {
  Users,
  BookOpen,
  UserCheck,
  BarChart3,
  PlusCircle,
  ClipboardList,
} from "lucide-react";
import { get } from "../../WebService/RequestBuilder";
import { useEffect } from "react";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [usersCount, setUsersCount] = useState(0);
  const [instructorCount, setInstructorCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);

  const fetchUsersCount = async () => {
    const { pagination, success, users } = await get("/users");

    if (success) {
      setUsersCount(pagination.count);

      if (users && users.length > 0) {
        const instructors = users.filter((user) => user.role === "instructor");
        console.log("Instructors:", instructors);
        setInstructorCount(instructors.length);
      }
    }
  };

  const fetchCoursesCount = async () => {
    const { data, success } = await get("/courses");
    if (success) {
      console.log("Total Courses:", data.length);
      setCoursesCount(data.length);
    }
  };

  useEffect(() => {
    fetchUsersCount();
    fetchCoursesCount();
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
        <div className="px-6 py-10 max-w-7xl mx-auto space-y-10">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4 border-l-4 border-emerald-600">
              <Users className="w-8 h-8 text-emerald-600" />
              <div>
                <h2 className="text-xl font-semibold text-black">
                  {usersCount}
                </h2>
                <p className="text-sm text-gray-500">Total Users</p>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4 border-l-4 border-indigo-600">
              <UserCheck className="w-8 h-8 text-indigo-600" />
              <div>
                <h2 className="text-xl font-semibold text-black">
                  {instructorCount}
                </h2>
                <p className="text-sm text-gray-500">Instructors</p>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4 border-l-4 border-yellow-500">
              <BookOpen className="w-8 h-8 text-yellow-500" />
              <div>
                <h2 className="text-xl font-semibold text-black">
                  {coursesCount}
                </h2>
                <p className="text-sm text-gray-500">Courses</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium 
                    hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                    focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl 
                    transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed
                    disabled:transform-none flex items-center gap-3"
            >
              <PlusCircle className="w-6 h-6" /> Create New Course
            </button>

            <button
              className="bg-gradient-to-r from-indigo-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium 
                    hover:from-indigo-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                    focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl 
                    transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed
                    disabled:transform-none flex items-center gap-3"
            >
              <BarChart3 className="w-6 h-6" /> View Analytics
            </button>

            <button
              className="bg-gradient-to-r from-yellow-600 to-yellow-600 text-white py-3 px-6 rounded-lg font-medium 
                    hover:from-yellow-700 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 
                    focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl 
                    transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed
                    disabled:transform-none flex items-center gap-3"
            >
              <ClipboardList className="w-6 h-6" /> View Reports
            </button>
          </div>

          {/* Chart Placeholder */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              User Growth (Coming Soon)
            </h3>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              📊 Chart Placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
