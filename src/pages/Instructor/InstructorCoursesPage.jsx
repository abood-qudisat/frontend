import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, Clock, BookOpen, MessageSquare } from "lucide-react";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import { get } from "../../WebService/RequestBuilder";
import { useEffect } from "react";

const InstructorCoursesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [courseDetails, setCourseDetails] = useState({});
  const [models, setModels] = useState([]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchCourseDetails = async () => {
    const { data, success } = await get(`/courses/${id}`);

    if (success) {
      setCourseDetails(data);
    }
  };

  const fetchModule = async () => {
    const { data, success } = await get(`/modules/course/${id}`);
    if (success) {
      setModels(data);
    }
  };

  useEffect(() => {
    // Fetch course details when the component mounts
    fetchCourseDetails();
    fetchModule();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} admin />

      <main
        className={`transition-all duration-300 ease-in-out pt-20 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <section className="px-6 py-8 max-w-5xl mx-auto space-y-10">
          {/* Banner */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={courseDetails.thumbnail_url}
              alt={courseDetails.title}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Course Info */}
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <h1 className="text-3xl font-bold text-gray-800">
                {courseDetails.title}
              </h1>
              <span className="text-emerald-600 font-semibold text-xl">
                ${courseDetails.price}
              </span>
            </div>
            <p className="text-gray-600">{courseDetails.description}</p>
            <div className="flex flex-wrap gap-6 text-sm text-gray-700 pt-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">Created At:</span>{" "}
                {new Date(courseDetails.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Lessons */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-semibold text-gray-800">
                Course Modules
              </h2>
              <button
                className="ml-auto bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-md"
                onClick={() => navigate(`/create-model-instructor/${id}`)}
              >
                + Add modules
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {models.map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => navigate(`/instructor-lessons/${lesson.id}`)}
                  className="cursor-pointer group p-4 rounded-lg border border-gray-200 hover:shadow-md hover:border-emerald-400 transition"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-gray-800 font-semibold group-hover:text-emerald-600">
                      {lesson.title}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {lesson.duration}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    Click to open lesson
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default InstructorCoursesPage;
