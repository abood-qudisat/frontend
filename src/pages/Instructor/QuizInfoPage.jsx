import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import { BarChart3, FileText, Users, Calendar, CheckCircle, Pencil } from "lucide-react";

const quiz = {
    title: "React Basics Quiz",
    course: "React Fundamentals",
    createdAt: "2024-06-01",
    totalQuestions: 5,
    questions: [
        { text: "React is a JavaScript library for building UIs.", answer: "true" },
        { text: "JSX stands for JavaScript XML.", answer: "true" },
        { text: "React uses a real DOM for rendering.", answer: "false" },
        { text: "useState is used to manage lifecycle methods.", answer: "false" },
        { text: "React supports functional components.", answer: "true" },
    ],
    students: [
        {
            name: "Khaled Al-Lham",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            score: 5,
            submittedAt: "2024-06-14",
        },
        {
            name: "Sara Ahmad",
            avatar: "https://randomuser.me/api/portraits/women/55.jpg",
            score: 4,
            submittedAt: "2024-06-14",
        },
        {
            name: "Yazan Kamal",
            avatar: "https://randomuser.me/api/portraits/men/85.jpg",
            score: 3,
            submittedAt: "2024-06-15",
        },
    ],
};

const QuizInfoPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const navigate = useNavigate();

    const avgScore =
        quiz.students.reduce((acc, curr) => acc + curr.score, 0) /
        quiz.students.length;

    return (
        <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className={`transition-all duration-300 ease-in-out pt-20 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
                <div className="px-6 py-8 max-w-5xl mx-auto space-y-6">

                    {/* Header + Edit Button */}
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 relative">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{quiz.title}</h1>
                        <p className="text-gray-600 text-sm flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Course: <strong>{quiz.course}</strong>
                        </p>
                        <p className="text-gray-600 text-sm flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4" />
                            Created At: {new Date(quiz.createdAt).toLocaleDateString()}
                        </p>
                        <button
                            onClick={() => navigate("/create-quizzes")}
                            className="top-6 right-6  absolute bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm py-2 px-4 rounded-lg font-medium 
                                    hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                                    focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center
                                    transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed gap-1
                                    disabled:transform-none"

                        >
                            <Pencil className="w-4 h-4" />
                            Edit Quiz
                        </button>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-emerald-100 text-emerald-800 p-4 rounded-lg text-center">
                            <h3 className="text-xl font-semibold">{quiz.totalQuestions}</h3>
                            <p className="text-sm">Total Questions</p>
                        </div>
                        <div className="bg-blue-100 text-blue-800 p-4 rounded-lg text-center">
                            <h3 className="text-xl font-semibold">{quiz.students.length}</h3>
                            <p className="text-sm">Submissions</p>
                        </div>
                        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg text-center">
                            <h3 className="text-xl font-semibold">{avgScore.toFixed(1)}</h3>
                            <p className="text-sm">Average Score</p>
                        </div>
                    </div>

                    {/* Questions List */}
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Questions & Answers</h2>
                        <ul className="space-y-4">
                            {quiz.questions.map((q, index) => (
                                <li key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                    <p className="text-sm font-medium text-gray-700 mb-2">
                                        {index + 1}. {q.text}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Correct Answer: <span className="font-semibold text-emerald-600">{q.answer}</span>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Student Results */}
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Student Results</h2>
                        <ul className="space-y-4">
                            {quiz.students.map((student, index) => (
                                <li key={index} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full border" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{student.name}</p>
                                            <p className="text-xs text-gray-500">
                                                Submitted: {new Date(student.submittedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-emerald-600">
                                            {student.score}/{quiz.totalQuestions}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default QuizInfoPage;
