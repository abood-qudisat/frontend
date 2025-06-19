import React, { useState } from "react";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import { Plus, Trash2 } from "lucide-react";

const availableCourses = [
    "React Fundamentals",
    "Node.js Backend Mastery",
    "UI/UX Design Essentials",
];

const CreateQuizPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const [quizTitle, setQuizTitle] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [questions, setQuestions] = useState([
        { text: "", answer: "true" },
    ]);

    const handleAddQuestion = () => {
        setQuestions([...questions, { text: "", answer: "true" }]);
    };

    const handleRemoveQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleQuestionChange = (index, field, value) => {
        const updated = [...questions];
        updated[index][field] = value;
        setQuestions(updated);
    };

    const handleSubmit = () => {
        if (!quizTitle || !selectedCourse || questions.some(q => !q.text.trim())) {
            alert("Please fill in all required fields.");
            return;
        }

        const newQuiz = {
            title: quizTitle,
            course: selectedCourse,
            questions,
        };

        console.log("Creating Quiz:", newQuiz);
        alert("Quiz Created Successfully!");
        // Send to backend here
    };

    return (
        <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} admin />

            <div
                className={`transition-all duration-300 ease-in-out pt-20 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"
                    }`}
            >
                <div className="px-6 py-8 max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Create a New Quiz
                    </h1>

                    <div className="bg-white p-6 rounded-xl shadow-md space-y-6 border border-gray-100">
                        {/* Quiz Info */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Quiz Title
                            </label>
                            <input
                                type="text"
                                value={quizTitle}
                                onChange={(e) => setQuizTitle(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 text-black"
                                placeholder="Enter quiz title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Course
                            </label>
                            <select
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-emerald-500  text-black"
                            >
                                <option value="">Select a course</option>
                                {availableCourses.map((course, idx) => (
                                    <option key={idx} value={course}>
                                        {course}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Questions */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Questions
                            </label>

                            <div className="space-y-4">
                                {questions.map((q, index) => (
                                    <div
                                        key={index}
                                        className="border border-gray-200 p-4 rounded-lg bg-gray-50"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-gray-800">
                                                Question {index + 1}
                                            </span>
                                            {questions.length > 1 && (
                                                <button
                                                    onClick={() => handleRemoveQuestion(index)}
                                                    className="text-red-600 hover:text-red-800 text-sm"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Enter question text"
                                            value={q.text}
                                            onChange={(e) =>
                                                handleQuestionChange(index, "text", e.target.value)
                                            }
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm mb-3 focus:ring-1 focus:ring-emerald-500  text-black"
                                        />
                                        <select
                                            value={q.answer}
                                            onChange={(e) =>
                                                handleQuestionChange(index, "answer", e.target.value)
                                            }
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-500 bg-white  text-black"
                                        >
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleAddQuestion}
                                className="flex items-center gap-1 text-emerald-600 mt-4 hover:text-emerald-700 text-sm font-medium"
                            >
                                <Plus className="w-4 h-4" />
                                Add Question
                            </button>
                        </div>

                        {/* Submit */}
                        <div className="text-right">
                            <button
                                onClick={handleSubmit}
                                className="bg-emerald-600 text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
                            >
                                Create Quiz
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateQuizPage;
