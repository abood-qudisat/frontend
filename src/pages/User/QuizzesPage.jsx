import React, { useState } from 'react';
import { Calendar, CheckCircle, Timer, FileText } from 'lucide-react';
import Navbar from '../../components/ui/Navbar';
import Sidebar from '../../components/ui/Sidebar';
import { useNavigate } from 'react-router-dom';
import { quizzes } from '../../config/dummyDaya';

const getStatusColor = (status) => {
    return {
        completed: 'bg-emerald-100 text-emerald-700',
        pending: 'bg-amber-100 text-amber-700',
        available: 'bg-blue-100 text-blue-700',
    }[status] || 'bg-gray-100 text-gray-700';
};

const getStatusIcon = (status) => {
    return {
        completed: <CheckCircle className="w-4 h-4" />,
        pending: <Timer className="w-4 h-4" />,
        available: <FileText className="w-4 h-4" />
    }[status] || <FileText className="w-4 h-4" />;
};

const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const QuizzesPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className={`transition-all duration-300 ease-in-out pt-26 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
                <div className="px-6 py-8">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-semibold text-gray-800 mb-2">My Quizzes</h1>
                        <p className="text-gray-600">Review your quizzes and scores, and check upcoming quizzes.</p>
                    </div>

                    {/* Quiz Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quizzes.map((quiz) => (
                            <div
                                key={quiz.id}
                                className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all p-5"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-lg font-semibold text-gray-800">{quiz.title}</h2>
                                    <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(quiz.status)}`}>
                                        {getStatusIcon(quiz.status)} {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-600 mb-1"><strong>Course:</strong> {quiz.course}</p>
                                <p className="text-sm text-gray-600 mb-1"><strong>Questions:</strong> {quiz.questions}</p>

                                <p className="text-sm text-gray-600 mb-1">
                                    <strong>Start:</strong> {formatDate(quiz.startDate)}
                                </p>
                                <p className="text-sm text-gray-600 mb-3">
                                    <strong>End:</strong> {formatDate(quiz.endDate)}
                                </p>

                                <div className="flex justify-between items-center mt-3">
                                    <span className="text-sm font-medium text-emerald-600">
                                        {quiz.score !== null ? `Score: ${quiz.score}/${quiz.maxScore}` : `${quiz.maxScore} pts`}
                                    </span>
                                    <button className={`text-sm ${quiz.status == "pending" ? 'text-grey' : 'text-white'} bg-emerald-600 hover:bg-emerald-700 px-4 py-1.5 rounded-lg transition`}
                                        disabled={quiz.status == "pending"}
                                        onClick={() => { quiz.status === 'completed' ? navigate('/quiz-result') : navigate('/exam') }}
                                    >
                                        {quiz.status === 'completed' ? 'View Result' : 'Start Quiz'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default QuizzesPage;
