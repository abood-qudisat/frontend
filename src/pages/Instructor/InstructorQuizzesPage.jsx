import React, { useEffect, useState } from "react";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import {
  Eye,
  Edit3,
  Trash2,
  PlusCircle,
  FileQuestion,
  Clock,
  Award,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { get } from "../../WebService/RequestBuilder";

const InstructorQuizzesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const navigate = useNavigate();
  const { id } = useParams(); // lesson_id

  useEffect(() => {
    const fetchQuizzes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, success } = await get(`/quizzes/lesson/${id}`);
        console.log("Fetched quiz data:", data);

        if (success && data) {
          setQuizzes(Array.isArray(data) ? data : [data]);
        } else {
          setError("Failed to fetch quizzes");
          setQuizzes([]);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setError("An error occurred while fetching quizzes");
        setQuizzes([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchQuizzes();
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div
          className={`transition-all duration-300 ease-in-out pt-20 ${
            sidebarOpen ? "lg:ml-64" : "lg:ml-20"
          }`}
        >
          <div className="px-6 py-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              <span className="ml-3 text-gray-600">Loading quizzes...</span>
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
        className={`transition-all duration-300 ease-in-out pt-20 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <div className="px-6 py-8 max-w-6xl mx-auto space-y-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Lesson
          </button>

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                Quiz Questions
              </h1>
              <p className="text-gray-600 text-sm">
                Manage quiz questions for lesson ID: {id}
              </p>
            </div>
            <button
              onClick={() => navigate(`/create-quizzes?lessonId=${id}`)}
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition text-sm font-medium shadow-md"
            >
              <PlusCircle className="w-5 h-5" />
              Add New Question
            </button>
          </div>

          {/* Stats Summary */}
          {quizzes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <FileQuestion className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">
                      {quizzes.length}
                    </p>
                    <p className="text-sm text-gray-600">Total Questions</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quiz Questions */}
          {error ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <FileQuestion className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Error Loading Quizzes
              </h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : quizzes.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <FileQuestion className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                No Quiz Questions
              </h2>
              <p className="text-gray-600 mb-4">
                This lesson doesn't have any quiz questions yet. Create your
                first question to get started.
              </p>
              <button
                onClick={() => navigate(`/create-quizzes?lessonId=${id}`)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Create First Question
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {quizzes.map((quiz, index) => (
                <div
                  key={quiz.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    {/* Question Content */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            {quiz.question || "No question text"}
                          </h3>

                          {/* Options */}
                          {quiz.options && quiz.options.length > 0 && (
                            <div className="space-y-2 mb-4">
                              <p className="text-sm text-gray-600 font-medium">
                                Answer Options:
                              </p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {quiz.options.map((option, optionIndex) => (
                                  <div
                                    key={optionIndex}
                                    className={`p-2 rounded-lg border text-sm ${
                                      option === quiz.correct_answer
                                        ? "bg-green-50 border-green-200 text-green-800"
                                        : "bg-gray-50 border-gray-200 text-gray-700"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      {option === quiz.correct_answer && (
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                      )}
                                      <span className="font-medium">
                                        {String.fromCharCode(65 + optionIndex)}.
                                      </span>
                                      <span>{option}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Quiz Details */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Award className="w-4 h-4" />
                              <span>Points: {quiz.max_score || 0}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>
                                Created: {formatDate(quiz.created_at)}
                              </span>
                            </div>
                            {quiz.updated_at !== quiz.created_at && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>
                                  Updated: {formatDate(quiz.updated_at)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-row lg:flex-col gap-2 lg:w-auto w-full">
                      <button
                        onClick={() => navigate(`/create-quizzes/${quiz.id}`)}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition font-medium"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorQuizzesPage;
