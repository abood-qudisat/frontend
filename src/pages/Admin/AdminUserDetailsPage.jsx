import { useState } from "react";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import { Calendar, BookOpen, HelpCircle, ClipboardList } from "lucide-react";

const user = {
    id: 1,
    name: "Khaled Al-Lham",
    email: "khaled@example.com",
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
    joined: "2024-01-15",
    points: 980,
    enrolledCourses: [
        { id: 1, title: "React Fundamentals", startDate: "2024-02-01", progress: 80 },
        { id: 2, title: "Node.js Essentials", startDate: "2024-03-10", progress: 60 }
    ],
    quizzes: [
        { id: 1, title: "React Basics", score: 90 },
        { id: 2, title: "State & Props", score: 85 }
    ],
    assignments: [
        { id: 1, title: "Build a To-Do App", grade: "A", submitted: true },
        { id: 2, title: "React Router Task", grade: "B+", submitted: true }
    ]
};

const AdminUserDetailsPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} admin />

            <div className={`transition-all duration-300 ease-in-out pt-20 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
                <div className="px-6 py-10 max-w-7xl mx-auto space-y-10">

                    {/* Page Title */}
                    <div className="text-3xl font-bold text-gray-800">User Analytics</div>

                    {/* User Summary */}
                    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start gap-8">
                        <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full border-4 border-emerald-500 shadow" />
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                            <p className="text-gray-500">{user.email}</p>
                            <p className="text-sm text-gray-400 mt-1">Joined: {new Date(user.joined).toLocaleDateString()}</p>
                            <div className="mt-4 flex flex-wrap gap-6">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-emerald-600">{user.points}</p>
                                    <p className="text-sm text-gray-500">Points</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-emerald-600">{user.enrolledCourses.length}</p>
                                    <p className="text-sm text-gray-500">Courses</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-emerald-600">{user.quizzes.length}</p>
                                    <p className="text-sm text-gray-500">Quizzes</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-emerald-600">{user.assignments.length}</p>
                                    <p className="text-sm text-gray-500">Assignments</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Data Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Courses */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-emerald-600" /> Courses Enrolled
                            </h3>
                            <div className="space-y-4">
                                {user.enrolledCourses.map((course) => (
                                    <div key={course.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-gray-800 font-medium">{course.title}</h4>
                                            <span className="text-sm text-gray-500">{course.progress}% done</span>
                                        </div>
                                        <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            Start: {new Date(course.startDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quizzes */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                <HelpCircle className="w-5 h-5 text-blue-600" /> Quizzes Taken
                            </h3>
                            <div className="space-y-4">
                                {user.quizzes.map((quiz) => (
                                    <div key={quiz.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                                        <div className="flex justify-between">
                                            <p className="text-gray-800 font-medium">{quiz.title}</p>
                                            <span className="text-sm font-bold text-blue-600">{quiz.score} / 100</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Assignments */}
                        <div className="bg-white p-6 rounded-xl shadow-md col-span-full">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                <ClipboardList className="w-5 h-5 text-purple-600" /> Assignments
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {user.assignments.map((assignment) => (
                                    <div key={assignment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                                        <div className="text-gray-800 font-medium">{assignment.title}</div>
                                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                                            <span>Grade: <span className="font-semibold text-purple-700">{assignment.grade}</span></span>
                                            <span>Status: {assignment.submitted ? <span className="text-emerald-600">Submitted</span> : <span className="text-red-500">Pending</span>}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUserDetailsPage;
