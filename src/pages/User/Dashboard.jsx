import React, { useState } from 'react';
import {
    BookOpen,
    Calendar,
    Award,
    Bell,
    ChevronRight,
    Clock,
    Target,
    CheckCircle
} from 'lucide-react';
import Navbar from '../../components/ui/Navbar';
import Sidebar from '../../components/ui/Sidebar';

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);


    const studentInfo = {
        name: "John Doe",
        enrolledCourses: 5,
        completedLessons: 23,
        pendingAssignments: 3
    };

    const recentCourses = [
        { id: 1, title: "React Advanced", progress: 65, lastAccessed: "2h ago" },
        { id: 2, title: "Node.js Fundamentals", progress: 40, lastAccessed: "1d ago" },
        { id: 3, title: "Web Security", progress: 25, lastAccessed: "3d ago" }
    ];

    const upcomingDeadlines = [
        { id: 1, title: "React Project Submission", course: "React Advanced", due: "Tomorrow" },
        { id: 2, title: "Security Quiz", course: "Web Security", due: "In 3 days" }
    ];

    return (
        <div className="min-h-screen  h-screen w-screen bg-gray-50 overflow-x-hidden"> 
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content Area */}
            <div className={`transition-all duration-300 ease-in-out pt-[70px] ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
                <div className="p-4 md:p-8 max-w-8xl mx-auto">
                    {/* Welcome Section */}
                    <div className="mb-6 md:mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                            Welcome back, {studentInfo.name}! 👋
                        </h1>
                        <p className="text-gray-600">
                            Track your progress and continue your learning journey
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                        <StatCard
                            icon={<BookOpen className="w-6 h-6" />}
                            title="Enrolled Courses"
                            value={studentInfo.enrolledCourses}
                            color="from-emerald-600 to-teal-600"
                        />
                        <StatCard
                            icon={<Award className="w-6 h-6" />}
                            title="Completed Lessons"
                            value={studentInfo.completedLessons}
                            color="from-blue-600 to-indigo-600"
                        />
                        <StatCard
                            icon={<Target className="w-6 h-6" />}
                            title="Pending Assignments"
                            value={studentInfo.pendingAssignments}
                            color="from-amber-500 to-orange-600"
                        />
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                        {/* Recent Courses */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800">Recent Courses</h2>
                                    <button className="text-emerald-600 hover:text-emerald-700 flex items-center text-sm font-medium">
                                        View All <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {recentCourses.map(course => (
                                        <div key={course.id}
                                            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-800">{course.title}</h3>
                                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {course.lastAccessed}
                                                </div>
                                            </div>
                                            <div className="ml-4 relative">
                                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                                                    <span className="text-emerald-600 font-semibold">{course.progress}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Deadlines */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800">Upcoming Deadlines</h2>
                                    <button className="text-emerald-600 hover:text-emerald-700 flex items-center text-sm font-medium">
                                        View All <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {upcomingDeadlines.map(deadline => (
                                        <div key={deadline.id}
                                            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-800">{deadline.title}</h3>
                                                <p className="text-sm text-gray-500 mt-1">{deadline.course}</p>
                                            </div>
                                            <div className="ml-4">
                                                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                                                    Due {deadline.due}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800">Upcoming Deadlines</h2>
                                    <button className="text-emerald-600 hover:text-emerald-700 flex items-center text-sm font-medium">
                                        View All <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {upcomingDeadlines.map(deadline => (
                                        <div key={deadline.id}
                                            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-800">{deadline.title}</h3>
                                                <p className="text-sm text-gray-500 mt-1">{deadline.course}</p>
                                            </div>
                                            <div className="ml-4">
                                                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                                                    Due {deadline.due}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, title, value, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
            <div className={`inline-flex items-center justify-center p-3 bg-gradient-to-r ${color} rounded-xl text-white shadow-lg mb-4`}>
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
            <p className="text-gray-600">{title}</p>
        </div>
    </div>
);

export default Dashboard;