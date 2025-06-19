import React, { useState } from 'react';
import Navbar from '../../components/ui/Navbar';
import Sidebar from '../../components/ui/Sidebar';

const QuizResultPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    // Normally this would come from backend or passed via state
    const answers = [
        {
            question: "React is a backend framework.",
            correctAnswer: false,
            userAnswer: false
        },
        {
            question: "JSX allows HTML in JS.",
            correctAnswer: true,
            userAnswer: true
        },
        {
            question: "useState is for lifecycle methods.",
            correctAnswer: false,
            userAnswer: true
        },
        {
            question: "React can use functional and class components.",
            correctAnswer: true,
            userAnswer: true
        }
    ];

    const score = answers.filter(a => a.correctAnswer === a.userAnswer).length;

    return (
        <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className={`transition-all duration-300 ease-in-out pt-20 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
                <div className="px-6 py-8 max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Quiz Results</h1>
                        <p className="text-center text-gray-600 mb-6">
                            You got <span className="text-emerald-600 font-semibold">{score}</span> out of {answers.length} questions correct.
                        </p>

                        <div className="space-y-5">
                            {answers.map((a, index) => {
                                const isCorrect = a.correctAnswer === a.userAnswer;
                                return (
                                    <div key={index} className={`p-4 rounded-lg border ${isCorrect ? 'border-emerald-300 bg-emerald-50' : 'border-red-300 bg-red-50'}`}>
                                        <p className="text-gray-800 font-medium mb-2">Q{index + 1}: {a.question}</p>
                                        <div key={index} className={`p-4 flex items-center justify-between`}>
                                            <p className="text-sm text-black">
                                                ✅ Correct Answer: <span className="font-semibold">{a.correctAnswer ? 'True' : 'False'}</span>
                                            </p>
                                            <p className="text-sm">
                                                Your Answer: <span className={`font-semibold ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                                                    {a.userAnswer ? 'True' : 'False'}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* <div className="text-center mt-8">
                            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg">
                                Retake Quiz
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizResultPage;
