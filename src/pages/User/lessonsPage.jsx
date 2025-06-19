import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/ui/Navbar';
import Sidebar from '../../components/ui/Sidebar';
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
    Download
} from 'lucide-react';

// Dummy lesson data
// ...existing code...
const lessons = [
    {
        id: 1,
        title: "Introduction to React",
        duration: "15 min",
        material: `React is a JavaScript library for building user interfaces. 
It lets you build reusable UI components and manage state and props efficiently.`,
        analysis: `✅ Start by understanding how components are structured.
💡 Practice by breaking a UI into smaller components.
📌 Don’t worry about Redux or advanced hooks at this stage.`,
        isCompleted: false,
        resources: [
            { name: "React Docs", link: "https://reactjs.org/docs/getting-started.html" },
            { name: "Cheat Sheet PDF", link: "#" }
        ],
        quizzes: [
            { id: 101, title: "React Basics Quiz", questionCount: 5 }
        ],
        instructor: {
            name: "John Doe",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        }
    },
    {
        id: 2,
        title: "Advanced React Concepts",
        duration: "20 min",
        material: `Explore advanced concepts like context, reducers, and custom hooks. 
Learn how to manage complex state and side effects in your React applications.`,
        analysis: `✅ Focus on understanding the use cases for each advanced concept.
💡 Try building a small project using context or reducers.
📌 Pay attention to performance optimizations when using these concepts.`,
        isCompleted: false,
        resources: [
            { name: "React Context API", link: "https://reactjs.org/docs/context.html" },
            { name: "Reducers in Depth", link: "#" }
        ],
        quizzes: [
            { id: 102, title: "Advanced React Quiz", questionCount: 7 }
        ],
        instructor: {
            name: "Jane Smith",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        }
    },
    {
        id: 3,
        title: "React Router and Navigation",
        duration: "18 min",
        material: `Learn how to implement navigation in your React applications using React Router. 
Understand different routing techniques and how to pass parameters between routes.`,
        analysis: `✅ Start with basic routing and navigation.
💡 Practice implementing protected routes and dynamic routing.
📌 Explore different navigation patterns and choose the best one for your app.`,
        isCompleted: false,
        resources: [
            { name: "React Router Docs", link: "https://reactrouter.com/docs/en/v6/getting-started/overview" },
            { name: "Navigation Examples", link: "#" }
        ],
        quizzes: [
            { id: 103, title: "React Router Quiz", questionCount: 6 }
        ],
        instructor: {
            name: "Mike Johnson",
            avatar: "https://randomuser.me/api/portraits/men/55.jpg"
        }
    },
    {
        id: 4,
        title: "Styling React Components",
        duration: "22 min",
        material: `Discover different ways to style your React components, including CSS-in-JS solutions. 
Learn how to create reusable styles and themes for your application.`,
        analysis: `✅ Start with basic CSS and inline styles.
💡 Explore CSS-in-JS libraries like styled-components or Emotion.
📌 Practice creating responsive designs and themes.`,
        isCompleted: false,
        resources: [
            { name: "Styled Components Docs", link: "https://styled-components.com/docs" },
            { name: "CSS Modules Guide", link: "#" }
        ],
        quizzes: [
            { id: 104, title: "Styling React Quiz", questionCount: 8 }
        ],
        instructor: {
            name: "Emily White",
            avatar: "https://randomuser.me/api/portraits/women/66.jpg"
        }
    }
];
// ...existing code...

const LessonsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [lessonData, setLessonData] = useState(lessons.find(l => l.id === parseInt(id)));

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const handleMarkComplete = () => {
        setLessonData(prev => ({ ...prev, isCompleted: true }));
    };

    if (!lessonData) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg text-gray-700">
                Lesson not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <main className={`transition-all duration-300 ease-in-out pt-20 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
                <div className="px-6 py-8 max-w-5xl mx-auto space-y-10">

                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <BookOpen className="w-6 h-6 text-emerald-600" />
                            <h1 className="text-3xl font-bold text-gray-800">{lessonData.title}</h1>
                        </div>
                        <button
                            onClick={() => navigate(`/manage-lesson/${lessonData.id}`)}
                            className="text-sm flex items-center gap-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                        >
                            <Pencil className="w-4 h-4" />
                            Edit Lesson
                        </button>
                    </div>

                    {/* Instructor & Duration */}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <img src={lessonData.instructor.avatar} alt={lessonData.instructor.name} className="w-10 h-10 rounded-full" />
                        <span>Instructor: {lessonData.instructor.name}</span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {lessonData.duration}
                        </span>
                    </div>

                    {/* Material */}
                    <section className="bg-white p-6 rounded-xl shadow space-y-3">
                        <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-5 h-5 text-emerald-600" />
                            <h2 className="text-lg font-semibold text-gray-800">Lesson Material</h2>
                        </div>
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed">{lessonData.material}</p>
                    </section>

                    {/* Analysis */}
                    <section className="bg-white p-6 rounded-xl shadow space-y-3">
                        <div className="flex items-center gap-2 mb-2">
                            <Lightbulb className="w-5 h-5 text-yellow-500" />
                            <h2 className="text-lg font-semibold text-gray-800">How to Approach This Lesson</h2>
                        </div>
                        <p className="text-gray-700 whitespace-pre-line">{lessonData.analysis}</p>
                    </section>

                    {/* Resources */}
                    {lessonData.resources?.length > 0 && (
                        <section className="bg-white p-6 rounded-xl shadow space-y-3">
                            <div className="flex items-center gap-2 mb-2">
                                <Download className="w-5 h-5 text-blue-500" />
                                <h2 className="text-lg font-semibold text-gray-800">Attachments & Resources</h2>
                            </div>
                            <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
                                {lessonData.resources.map((res, idx) => (
                                    <li key={idx}>
                                        <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline">
                                            {res.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Quizzes */}
                    <section className="bg-white p-6 rounded-xl shadow space-y-3">
                        <div className="flex items-center gap-2 mb-4 justify-between">
                            <div className="flex items-center gap-2">
                                <FileQuestion className="w-5 h-5 text-indigo-600" />
                                <h2 className="text-lg font-semibold text-gray-800">Quiz Section</h2>
                            </div>
                            <button
                                onClick={() => navigate(`/create-quizzes?lessonId=${lessonData.id}`)}
                                className="flex items-center gap-1 text-sm bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700"
                            >
                                <PlusCircle className="w-4 h-4" />
                                Add Quiz
                            </button>
                        </div>

                        {lessonData.quizzes.length === 0 ? (
                            <p className="text-gray-500 text-sm">No quizzes for this lesson yet.</p>
                        ) : (
                            lessonData.quizzes.map((quiz) => (
                                <div key={quiz.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition">
                                    <div>
                                        <h3 className="text-gray-800 font-semibold">{quiz.title}</h3>
                                        <p className="text-sm text-gray-600">{quiz.questionCount} Questions</p>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/quiz-info`)}
                                        className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                                    >
                                        View Quiz
                                    </button>
                                </div>
                            ))
                        )}
                    </section>

                    {/* Complete Button */}
                    {!lessonData.isCompleted && (
                        <div className="text-center">
                            <button
                                onClick={handleMarkComplete}
                                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium 
                hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <CheckCircle className="inline w-5 h-5 mr-2" />
                                Mark Lesson as Complete
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default LessonsPage;
