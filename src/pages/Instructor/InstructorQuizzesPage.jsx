import React, { useState } from "react";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import { Eye, Edit3, Trash2, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const quizzes = [
    {
        id: 1,
        title: "React Basics Quiz",
        course: "React Fundamentals",
        questions: 10,
        createdAt: "2024-05-10",
    },
    {
        id: 2,
        title: "Node.js Core Concepts",
        course: "Node.js Backend Mastery",
        questions: 8,
        createdAt: "2024-06-01",
    },
    {
        id: 3,
        title: "Design Thinking Quiz",
        course: "UI/UX Design Essentials",
        questions: 12,
        createdAt: "2024-06-12",
    },
];

const InstructorQuizzesPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} admin />

            <div
                className={`transition-all duration-300 ease-in-out pt-20 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"
                    }`}
            >
                <div className="px-6 py-8 max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h1 className="text-3xl font-semibold text-gray-800 mb-1">
                                Quizzes Management
                            </h1>
                            <p className="text-gray-600 text-sm">
                                View, update, or delete your quizzes.
                            </p>
                        </div>
                        <button onClick={() => navigate('/create-quizzes')} className="flex items-center gap-2 bg-emerald-600 text-black px-4 py-2 rounded-lg hover:bg-emerald-700 transition text-sm font-medium shadow-md">
                            <PlusCircle className="w-5 h-5" />
                            Create New Quiz
                        </button>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quizzes.map((quiz) => (
                            <div
                                key={quiz.id}
                                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="mb-4">
                                    <h2 className="text-xl font-bold text-gray-800 mb-1">
                                        {quiz.title}
                                    </h2>
                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 mb-2">
                                        {quiz.course}
                                    </span>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Questions:{" "}
                                        <span className="font-medium text-gray-700">
                                            {quiz.questions}
                                        </span>
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Created: {new Date(quiz.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="flex gap-2 mt-4">
                                    <button onClick={() => navigate('/quiz-info')} className="flex-1 flex items-center justify-center gap-1 text-sm px-3 py-2 rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition font-medium">
                                        <Eye className="w-4 h-4" />
                                        View
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-1 text-sm px-3 py-2 rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 transition font-medium">
                                        <Edit3 className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-1 text-sm px-3 py-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition font-medium">
                                        <Trash2 className="w-4 h-4" />
                                        Delete
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

export default InstructorQuizzesPage;
