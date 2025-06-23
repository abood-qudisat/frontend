import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import { Plus, Trash2, ArrowLeft, Save, Eye } from "lucide-react";
import { get, post, put } from "../../WebService/RequestBuilder";

const CreateQuizPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams(); // quiz ID for editing
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("lessonId");
  const navigate = useNavigate();

  const isEditMode = !!id;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Form state
  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""], // 4 options for multiple choice
    correct_answer: "",
    max_score: 10,
    lesson_id: lessonId || "",
  });

  // Load quiz data for editing
  useEffect(() => {
    if (isEditMode && id) {
      fetchQuizData();
    }
  }, [id, isEditMode]);

  const fetchQuizData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { success, data } = await get(`/quizzes/${id}`);

      if (success && data) {
        setFormData({
          question: data.question || "",
          options: data.options || ["", "", "", ""],
          correct_answer: data.correct_answer || "",
          max_score: data.max_score || 10,
          lesson_id: data.lesson_id || lessonId || "",
        });
      } else {
        setError("Failed to load quiz data");
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
      setError("An error occurred while loading the quiz");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData((prev) => ({
      ...prev,
      options: newOptions,
    }));

    // If this option was the correct answer and it's now empty, clear correct answer
    if (formData.correct_answer === formData.options[index] && !value) {
      setFormData((prev) => ({
        ...prev,
        correct_answer: "",
      }));
    }
  };

  const addOption = () => {
    if (formData.options.length < 6) {
      // Max 6 options
      setFormData((prev) => ({
        ...prev,
        options: [...prev.options, ""],
      }));
    }
  };

  const removeOption = (index) => {
    if (formData.options.length > 2) {
      // Min 2 options
      const newOptions = formData.options.filter((_, i) => i !== index);
      let newCorrectAnswer = formData.correct_answer;

      // If we're removing the correct answer, clear it
      if (formData.correct_answer === formData.options[index]) {
        newCorrectAnswer = "";
      }

      setFormData((prev) => ({
        ...prev,
        options: newOptions,
        correct_answer: newCorrectAnswer,
      }));
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.question.trim()) {
      errors.push("Question text is required");
    }

    if (!formData.lesson_id) {
      errors.push("Lesson ID is required");
    }

    const filledOptions = formData.options.filter((opt) => opt.trim());
    if (filledOptions.length < 2) {
      errors.push("At least 2 answer options are required");
    }

    if (!formData.correct_answer.trim()) {
      errors.push("Correct answer must be selected");
    }

    if (!filledOptions.includes(formData.correct_answer)) {
      errors.push("Correct answer must match one of the options");
    }

    if (formData.max_score < 1) {
      errors.push("Score must be at least 1 point");
    }

    return errors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(", "));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Filter out empty options and trim whitespace
      const cleanedOptions = formData.options
        .filter((opt) => opt.trim())
        .map((opt) => opt.trim());

      const quizData = {
        question: formData.question.trim(),
        options: cleanedOptions, // Send only filled options
        correct_answer: formData.correct_answer.trim(),
        lesson_id: parseInt(formData.lesson_id),
      };

      console.log("Sending quiz data:", quizData);

      let response;
      if (isEditMode) {
        response = await put(`/quizzes/${id}`, quizData);
      } else {
        response = await post("/quizzes", quizData);
      }

      console.log("Response:", response);

      if (response.success) {
        // Navigate back to quiz list or lesson
        if (lessonId) {
          navigate(`/instructor-quizzes/${lessonId}`);
        } else {
          navigate("/instructor-quizzes");
        }
      } else {
        setError(
          response.error ||
            response.message ||
            `Failed to ${isEditMode ? "update" : "create"} quiz`
        );
      }
    } catch (error) {
      console.error("Error saving quiz:", error);
      setError(
        `An error occurred while ${
          isEditMode ? "updating" : "creating"
        } the quiz`
      );
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="px-6 py-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              <span className="ml-3 text-gray-600">Loading quiz...</span>
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
        <div className="px-6 py-8 max-w-4xl mx-auto space-y-6">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {isEditMode ? "Edit Quiz Question" : "Create Quiz Question"}
              </h1>
              <p className="text-gray-600 mt-1">
                {isEditMode
                  ? "Update the quiz question details"
                  : "Add a new quiz question to your lesson"}
              </p>
            </div>

            {isEditMode && (
              <button
                onClick={() => navigate(`/quiz-info/${id}`)}
                className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
              >
                <Eye className="w-4 h-4" />
                View Quiz
              </button>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Main Form */}
          <div className="bg-white p-6 rounded-xl shadow-md space-y-6 border border-gray-100">
            {/* Question Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.question}
                onChange={(e) => handleInputChange("question", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-800 resize-none"
                placeholder="Enter your quiz question..."
                rows="3"
              />
            </div>

            {/* Lesson ID (if not from URL) */}
            {!lessonId && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lesson ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.lesson_id}
                  onChange={(e) =>
                    handleInputChange("lesson_id", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-800"
                  placeholder="Enter lesson ID"
                />
              </div>
            )}

            {/* Score */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Points <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.max_score}
                onChange={(e) => handleInputChange("max_score", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-800"
                placeholder="Enter points for this question"
              />
              <p className="text-xs text-gray-500 mt-1">
                Points awarded for correct answer (1-100)
              </p>
            </div>

            {/* Answer Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Answer Options <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-4">
                Add at least 2 options. Select the correct answer by clicking
                the radio button.
              </p>

              <div className="space-y-3">
                {formData.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    {/* Correct Answer Radio */}
                    <input
                      type="radio"
                      name="correct_answer"
                      checked={
                        formData.correct_answer === option &&
                        option.trim() !== ""
                      }
                      onChange={() =>
                        option.trim() &&
                        handleInputChange("correct_answer", option)
                      }
                      className="text-emerald-600 focus:ring-emerald-500"
                      disabled={!option.trim()}
                    />

                    {/* Option Label */}
                    <span className="text-sm font-medium text-gray-600 w-8">
                      {String.fromCharCode(65 + index)}.
                    </span>

                    {/* Option Input */}
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-gray-800"
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    />

                    {/* Remove Option */}
                    {formData.options.length > 2 && (
                      <button
                        onClick={() => removeOption(index)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Remove option"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Option Button */}
              {formData.options.length < 6 && (
                <button
                  onClick={addOption}
                  className="flex items-center gap-2 text-emerald-600 mt-3 hover:text-emerald-700 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Option
                </button>
              )}
            </div>

            {/* Correct Answer Preview */}
            {formData.correct_answer && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  <strong>Correct Answer:</strong> {formData.correct_answer}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {isSubmitting
                  ? isEditMode
                    ? "Updating..."
                    : "Creating..."
                  : isEditMode
                  ? "Update Quiz"
                  : "Create Quiz"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizPage;
