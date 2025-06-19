import React, { useState } from 'react';
import Navbar from '../../components/ui/Navbar';
import Sidebar from '../../components/ui/Sidebar';
import { useNavigate } from 'react-router-dom';

const sampleQuestions = [
    {
        id: 1,
        question: "React is a backend framework.",
        correctAnswer: false
    },
    {
        id: 2,
        question: "JSX allows you to write HTML in JavaScript.",
        correctAnswer: true
    },
    {
        id: 3,
        question: "The useState hook is used for lifecycle methods.",
        correctAnswer: false
    },
    {
        id: 4,
        question: "React components can be functional or class-based.",
        correctAnswer: true
    }
];

const ExamPage = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [step, setStep] = useState('pre'); // pre | exam | post
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const startExam = () => {
        setStep('exam');
        setCurrentQuestion(0);
        setAnswers([]);
    };

    const submitAnswer = (answer) => {
        const updatedAnswers = [...answers, {
            question: sampleQuestions[currentQuestion].question,
            correctAnswer: sampleQuestions[currentQuestion].correctAnswer,
            userAnswer: answer
        }];

        if (currentQuestion + 1 < sampleQuestions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setAnswers(updatedAnswers);
        } else {
            setAnswers(updatedAnswers);
            setStep('post');
        }
    };

    const score = answers.filter(a => a.correctAnswer === a.userAnswer).length;

    return (
        <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className={`transition-all duration-300 ease-in-out pt-20 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
                <div className="px-6 py-8 max-w-3xl mx-auto">
                    {step === 'pre' && (
                        <div className="bg-white p-6 rounded-xl shadow-md text-center">
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">🧪 Quiz Instructions</h1>
                            <p className="text-gray-600 mb-6">
                                This quiz consists of <strong>{sampleQuestions.length}</strong> true or false questions. Read each statement carefully before choosing your answer.
                            </p>
                            <button
                                onClick={startExam}
                                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                            >
                                Start Quiz
                            </button>
                        </div>
                    )}

                    {step === 'exam' && (
                        <div className="bg-white p-6 rounded-xl shadow-md text-center">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                Question {currentQuestion + 1} of {sampleQuestions.length}
                            </h2>
                            <p className="text-lg text-gray-700 mb-6">{sampleQuestions[currentQuestion].question}</p>
                            <div className="flex justify-center gap-6">
                                <button
                                    onClick={() => submitAnswer(true)}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    True
                                </button>
                                <button
                                    onClick={() => submitAnswer(false)}
                                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                >
                                    False
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 'post' && (
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">🎉 Quiz Completed</h1>
                            <p className="text-gray-600 text-center mb-6">
                                You answered <strong>{score}</strong> out of <strong>{sampleQuestions.length}</strong> correctly.
                            </p>

                            <div className="space-y-4">
                                {answers.map((a, i) => (
                                    <div key={i} className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                                        <p className="font-medium text-gray-800">Q{i + 1}: {a.question}</p>
                                        <p className="text-sm mt-1">
                                            ✅ Correct Answer: <span className="font-medium">{a.correctAnswer ? 'True' : 'False'}</span>
                                        </p>
                                        <p className="text-sm">
                                            🧠 Your Answer: <span className={`font-medium ${a.userAnswer === a.correctAnswer ? 'text-emerald-600' : 'text-red-600'}`}>
                                                {a.userAnswer ? 'True' : 'False'}
                                            </span>
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center mt-6">
                                <button
                                    onClick={() => navigate('/quizzes', { replace: true })}
                                    className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                                >
                                    Finish Quiz
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default ExamPage;
