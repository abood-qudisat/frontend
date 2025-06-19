import React, { useState } from 'react';
import Navbar from '../../components/ui/Navbar';
import Sidebar from '../../components/ui/Sidebar';
import { Plus, Users, ClipboardList, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InstructorDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const navigate = useNavigate();

    const instructor = {
        name: "Khaled Al-Lham",
        totalCourses: 4,
        totalStudents: 128,
        assignmentsToGrade: 12,
        recentCourses: [
            {
                id: 1,
                title: "Advanced React",
                students: 32,
                image: "https://images.unsplash.com/photo-1653387300291-bfa1eeb90e16?q=80&w=1740&auto=format&fit=crop",
                createdAt: "2024-06-01",
            },
            {
                id: 2,
                title: "Node.js Fundamentals",
                students: 40,
                image: "https://images.unsplash.com/photo-1650234083227-74c0700b295a?q=80&w=1740&auto=format&fit=crop",
                createdAt: "2024-05-15",
            },
            {
                id: 3,
                title: "UI/UX Design Basics",
                students: 56,
                image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1472&auto=format&fit=crop",
                createdAt: "2024-04-20",
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} admin />

            <div className={`transition-all duration-300 ease-in-out pt-20 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
                <div className="px-6 py-8 max-w-7xl mx-auto">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-4">Welcome back, {instructor.name.split(' ')[0]} 👋</h1>
                    <p className="text-gray-600 mb-8">Manage your courses, track progress, and engage with your students.</p>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                        <div className="bg-emerald-100 text-emerald-800 p-5 rounded-xl shadow">
                            <div className="flex items-center gap-3 mb-2">
                                <BookOpen className="w-6 h-6" />
                                <h2 className="text-lg font-semibold">Courses</h2>
                            </div>
                            <p className="text-2xl font-bold">{instructor.totalCourses}</p>
                        </div>

                        <div className="bg-blue-100 text-blue-800 p-5 rounded-xl shadow">
                            <div className="flex items-center gap-3 mb-2">
                                <Users className="w-6 h-6" />
                                <h2 className="text-lg font-semibold">Students</h2>
                            </div>
                            <p className="text-2xl font-bold">{instructor.totalStudents}</p>
                        </div>

                        <div className="bg-yellow-100 text-yellow-800 p-5 rounded-xl shadow">
                            <div className="flex items-center gap-3 mb-2">
                                <ClipboardList className="w-6 h-6" />
                                <h2 className="text-lg font-semibold">To Grade</h2>
                            </div>
                            <p className="text-2xl font-bold">{instructor.assignmentsToGrade}</p>
                        </div>
                    </div>

                    {/* Courses as Cards */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Your Courses</h2>
                        <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium 
                                    hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                                    focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center
                                    transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed gap-5
                                    disabled:transform-none" onClick={() => navigate('/create-courses')}>
                            <Plus className="w-4 h-4" />
                            Create New
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {instructor.recentCourses.map(course => (
                            <div
                                key={course.id}
                                className="bg-white rounded-xl overflow-hidden shadow border hover:shadow-xl transition-all duration-300"
                                onClick={() => navigate('/course')}
                            >
                                <div
                                    className="h-40 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${course.image})` }}
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{course.title}</h3>
                                    <p className="text-sm text-gray-600 mb-2">
                                        {course.students} Students • Created: {new Date(course.createdAt).toLocaleDateString()}
                                    </p>
                                    <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium 
                                    hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                                    focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl 
                                    transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed gap-5
                                    disabled:transform-none">
                                        View Details
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

export default InstructorDashboard;
