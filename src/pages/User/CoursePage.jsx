import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, BookOpen, MessageSquare } from 'lucide-react';
import Navbar from '../../components/ui/Navbar';
import Sidebar from '../../components/ui/Sidebar';

const course = {
    id: 1,
    title: "React Fundamentals",
    description: "Learn the fundamentals of React including components, state, hooks, and JSX. This course is perfect for beginners looking to enter front-end development.",
    category: "Programming",
    duration: "6 weeks",
    startDate: "2025-07-01",
    price: "49.99",
    image: "https://images.unsplash.com/photo-1653387300291-bfa1eeb90e16?q=80&w=1740",
    instructor: {
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    }
};

const lessons = [
    { id: 1, title: "Introduction to React", duration: "15 min" },
    { id: 2, title: "JSX and Component Structure", duration: "25 min" },
    { id: 3, title: "State and Props Deep Dive", duration: "30 min" },
    { id: 4, title: "Using useState and useEffect", duration: "20 min" }
];

const CoursePage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [commentInput, setCommentInput] = useState("");
    const [comments, setComments] = useState([
        { name: "Sarah", content: "This course was amazing and easy to follow!" },
        { name: "Ali", content: "Really helped me grasp the basics of React." }
    ]);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const navigate = useNavigate();

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentInput.trim()) {
            setComments([...comments, { name: "You", content: commentInput }]);
            setCommentInput("");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} admin />

            <main className={`transition-all duration-300 ease-in-out pt-20 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
                <section className="px-6 py-8 max-w-5xl mx-auto space-y-10">

                    {/* Banner */}
                    <div className="rounded-xl overflow-hidden shadow-lg">
                        <img src={course.image} alt={course.title} className="w-full h-64 object-cover" />
                    </div>

                    {/* Course Info */}
                    <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <h1 className="text-3xl font-bold text-gray-800">{course.title}</h1>
                            <span className="text-emerald-600 font-semibold text-xl">${course.price}</span>
                        </div>
                        <p className="text-gray-600">{course.description}</p>
                        <div className="flex flex-wrap gap-6 text-sm text-gray-700 pt-2">
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                <span className="font-medium">Category:</span> {course.category}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span className="font-medium">Duration:</span> {course.duration}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span className="font-medium">Start Date:</span> {new Date(course.startDate).toLocaleDateString()}
                            </div>
                        </div>

                        <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium 
                            hover:from-emerald-700 hover:to-teal-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-md transition-all">
                            Enroll Now
                        </button>
                    </div>

                    {/* Instructor Info */}
                    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
                        <img src={course.instructor.avatar} alt={course.instructor.name} className="w-16 h-16 rounded-full border-4 border-emerald-600" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">{course.instructor.name}</h3>
                            <p className="text-gray-600 text-sm">{course.instructor.email}</p>
                        </div>
                    </div>

                    {/* Lessons */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpen className="w-5 h-5 text-emerald-600" />
                            <h2 className="text-lg font-semibold text-gray-800">Course Lessons</h2>
                            <button
                                className="ml-auto bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-md"
                                onClick={() => navigate('/manage-lesson')}
                            >
                                + Add Lesson
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {lessons.map((lesson) => (
                                <div
                                    key={lesson.id}
                                    onClick={() => navigate(`/lessons/${lesson.id}`)}
                                    className="cursor-pointer group p-4 rounded-lg border border-gray-200 hover:shadow-md hover:border-emerald-400 transition"
                                >
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-gray-800 font-semibold group-hover:text-emerald-600">{lesson.title}</h4>
                                        <span className="text-xs text-gray-500">{lesson.duration}</span>
                                    </div>
                                    <div className="mt-1 text-sm text-gray-500">Click to open lesson</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Comments */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex items-center gap-2 mb-4">
                            <MessageSquare className="w-5 h-5 text-emerald-600" />
                            <h2 className="text-lg font-semibold text-gray-800">Student Comments</h2>
                        </div>

                        <div className="space-y-4 mb-6">
                            {comments.map((comment, index) => (
                                <div key={index} className="bg-gray-100 p-4 rounded-lg">
                                    <p className="font-medium text-gray-800">{comment.name}</p>
                                    <p className="text-sm text-gray-700">{comment.content}</p>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleCommentSubmit} className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                value={commentInput}
                                onChange={(e) => setCommentInput(e.target.value)}
                                placeholder="Write a comment..."
                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 text-black"
                            />
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium 
                                    hover:from-emerald-700 hover:to-teal-700 focus:ring-2 focus:ring-emerald-500 transition-all shadow-md"
                            >
                                Post
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default CoursePage;
