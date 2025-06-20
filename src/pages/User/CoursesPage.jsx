import React, { useEffect, useState } from "react";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import CourseCard from "../../components/ui/CourseCard";
import { get } from "../../WebService/RequestBuilder";

const CoursesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleFetchCourses = async () => {
    const { success, data } = await get("/courses");
    if (success) {
      setCourses(data);
      console.log("Courses fetched successfully:", data);
    } else {
      console.error("Failed to fetch courses");
    }
  };

  useEffect(() => {
    handleFetchCourses();
  }, []);

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
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Explore Courses
          </h1>
          <p className="text-gray-600 mb-8">
            Choose from our available courses and start learning today.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard course={course} key={course.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
