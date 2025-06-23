import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import {
  BookOpen,
  FileText,
  User,
  Clock,
  Lightbulb,
  Pencil,
  PlusCircle,
  CheckCircle,
  FileQuestion,
  Download,
  Calendar,
  Hash,
  Globe,
  Lock,
  Play,
  ArrowLeft,
} from "lucide-react";
import { get } from "../../WebService/RequestBuilder";

const InstructorLessonsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lessonData, setLessonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const fetchLessonData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { success, data } = await get(`/lessons/${id}`);
        console.log("Fetched lesson data:", data);

        if (success && data) {
          setLessonData(data);
        } else {
          setError("Failed to fetch lesson data");
        }
      } catch (error) {
        console.error("Error fetching lesson:", error);
        setError("An error occurred while fetching the lesson");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchLessonData();
    }
  }, [id]);

  // Get content type icon and color
  const getContentTypeDisplay = (contentType) => {
    switch (contentType) {
      case "video":
        return {
          icon: Play,
          color: "text-red-500",
          bg: "bg-red-50",
          label: "Video Lesson",
        };
      case "quiz":
        return {
          icon: FileQuestion,
          color: "text-indigo-500",
          bg: "bg-indigo-50",
          label: "Quiz",
        };
      case "text":
        return {
          icon: FileText,
          color: "text-green-500",
          bg: "bg-green-50",
          label: "Text Content",
        };
      default:
        return {
          icon: BookOpen,
          color: "text-gray-500",
          bg: "bg-gray-50",
          label: "Content",
        };
    }
  };

  // Format duration
  const formatDuration = (duration) => {
    if (!duration || duration === 0) return "No duration set";

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes} min`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <main
          className={`transition-all duration-300 ease-in-out pt-20 ${
            sidebarOpen ? "lg:ml-64" : "lg:ml-20"
          }`}
        >
          <div className="px-6 py-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              <span className="ml-3 text-gray-600">Loading lesson...</span>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !lessonData) {
    return (
      <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <main
          className={`transition-all duration-300 ease-in-out pt-20 ${
            sidebarOpen ? "lg:ml-64" : "lg:ml-20"
          }`}
        >
          <div className="px-6 py-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {error || "Lesson Not Found"}
              </h2>
              <p className="text-gray-600 mb-4">
                The lesson you're looking for doesn't exist or couldn't be
                loaded.
              </p>
              <button
                onClick={() => navigate(-1)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const contentTypeDisplay = getContentTypeDisplay(lessonData.content_type);
  const ContentIcon = contentTypeDisplay.icon;

  return (
    <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <main
        className={`transition-all duration-300 ease-in-out pt-20 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <div className="px-6 py-8 max-w-5xl mx-auto space-y-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course
          </button>

          {/* Header */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${contentTypeDisplay.bg}`}>
                    <ContentIcon
                      className={`w-8 h-8 ${contentTypeDisplay.color}`}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${contentTypeDisplay.bg} ${contentTypeDisplay.color}`}
                      >
                        {contentTypeDisplay.label}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          lessonData.is_free
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {lessonData.is_free ? "Free" : "Premium"}
                      </span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                      {lessonData.title || "Untitled Lesson"}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatDuration(lessonData.duration)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Hash className="w-4 h-4" />
                        <span>Order: {lessonData.order}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/manage-lesson/${lessonData.id}`)}
                    className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit Lesson
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Content Section */}
              <section className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <ContentIcon
                    className={`w-5 h-5 ${contentTypeDisplay.color}`}
                  />
                  <h2 className="text-lg font-semibold text-gray-800">
                    Content
                  </h2>
                </div>

                {lessonData.content_type === "video" && (
                  <div className="space-y-4">
                    {lessonData.content_url ? (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Video URL:</p>
                        <a
                          href={lessonData.content_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:text-emerald-700 underline break-all"
                        >
                          {lessonData.content_url}
                        </a>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Play className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">
                          No video content uploaded yet
                        </p>
                        <button className="mt-3 text-emerald-600 hover:text-emerald-700 font-medium">
                          Upload Video
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {lessonData.content_type === "quiz" && (
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <FileQuestion className="w-6 h-6 text-indigo-600" />
                      <h3 className="text-lg font-medium text-indigo-900">
                        Quiz Content
                      </h3>
                    </div>
                    <p className="text-indigo-700 mb-4">
                      This lesson contains quiz questions to test student
                      understanding.
                    </p>
                    <button
                      onClick={() =>
                        navigate(`/instructor-quizzes/${lessonData.id}`)
                      }
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Manage Quiz Questions
                    </button>
                  </div>
                )}

                {lessonData.content_type === "text" && (
                  <div>
                    {lessonData.content_url ? (
                      <div className="prose max-w-none">
                        <p className="text-gray-700">
                          Text content is available for this lesson.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">
                          No text content added yet
                        </p>
                        <button className="mt-3 text-emerald-600 hover:text-emerald-700 font-medium">
                          Add Content
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </section>

              {/* Additional Content URL */}
              {lessonData.content_url &&
                lessonData.content_type !== "video" && (
                  <section className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center gap-2 mb-4">
                      <Globe className="w-5 h-5 text-blue-500" />
                      <h2 className="text-lg font-semibold text-gray-800">
                        Content URL
                      </h2>
                    </div>
                    <a
                      href={lessonData.content_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 underline break-all"
                    >
                      {lessonData.content_url}
                    </a>
                  </section>
                )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Lesson Info */}
              <section className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Lesson Information
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Lesson ID</span>
                    <span className="font-medium">{lessonData.id}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Module ID</span>
                    <span className="font-medium">{lessonData.module_id}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Order</span>
                    <span className="font-medium">#{lessonData.order}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Duration</span>
                    <span className="font-medium">
                      {formatDuration(lessonData.duration)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Access</span>
                    <span
                      className={`font-medium ${
                        lessonData.is_free
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                    >
                      {lessonData.is_free ? (
                        <div className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          Free
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Lock className="w-4 h-4" />
                          Premium
                        </div>
                      )}
                    </span>
                  </div>
                </div>
              </section>

              {/* Timestamps */}
              <section className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Timestamps
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Created</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{formatDate(lessonData.created_at)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Last Updated</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{formatDate(lessonData.updated_at)}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quick Actions */}
              <section className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => navigate(`/manage-lesson/${lessonData.id}`)}
                    className="w-full flex items-center gap-2 text-left p-3 rounded-lg hover:bg-emerald-50 text-emerald-600 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit Lesson
                  </button>

                  {lessonData.content_type === "quiz" && (
                    <button
                      onClick={() =>
                        navigate(
                          `/instructor-quizzes/${lessonData.id}`
                        )
                      }
                      className="w-full flex items-center gap-2 text-left p-3 rounded-lg hover:bg-indigo-50 text-indigo-600 transition-colors"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Manage Quiz
                    </button>
                  )}

                  <button
                    onClick={() => navigate(`/module/${lessonData.module_id}`)}
                    className="w-full flex items-center gap-2 text-left p-3 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    View Module
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstructorLessonsPage;
