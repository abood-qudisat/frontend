import { useState } from "react";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import { BookOpen, Users, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const instructor = {
    name: "John Doe",
    email: "john@example.com",
    bio: "Passionate about front-end development, React expert, and mentor.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    joined: "2023-10-15",
    totalCourses: 5,
    totalStudents: 124,
    totalQuizzes: 18,
};

const courses = [
    {
        id: 1,
        title: "React Fundamentals",
        image: "https://images.unsplash.com/photo-1653387300291-bfa1eeb90e16?q=80&w=1740",
        enrolled: 40,
        lessons: 10
    },
    {
        id: 2,
        title: "Advanced JavaScript",
        image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600",
        enrolled: 30,
        lessons: 8
    },
    {
        id: 3,
        title: "Node.js for Beginners",
        image: "https://images.unsplash.com/photo-1581091012184-7a3c0cfd6f5b?q=80&w=1740",
        enrolled: 54,
        lessons: 12
    }
];

const InstructorProfilePage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} admin />

            <div className={`transition-all duration-300 ease-in-out pt-20 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
                <div className="px-6 py-8 max-w-6xl mx-auto space-y-10">

                    {/* Instructor Profile */}
                    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-6">
                        <img
                            src={instructor.avatar}
                            alt={instructor.name}
                            className="w-28 h-28 rounded-full border-4 border-emerald-600 object-cover"
                        />
                        <div className="text-center md:text-left space-y-1">
                            <h1 className="text-2xl font-bold text-gray-800">{instructor.name}</h1>
                            <p className="text-sm text-gray-600">{instructor.email}</p>
                            <p className="text-gray-500">{instructor.bio}</p>
                            <p className="text-sm text-gray-400">Joined: {new Date(instructor.joined).toLocaleDateString()}</p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-emerald-100 text-emerald-800 p-5 rounded-lg flex flex-col items-center">
                            <BookOpen className="w-6 h-6 mb-1" />
                            <p className="text-lg font-semibold">{instructor.totalCourses}</p>
                            <p className="text-sm">Courses</p>
                        </div>
                        <div className="bg-blue-100 text-blue-800 p-5 rounded-lg flex flex-col items-center">
                            <Users className="w-6 h-6 mb-1" />
                            <p className="text-lg font-semibold">{instructor.totalStudents}</p>
                            <p className="text-sm">Students</p>
                        </div>
                        <div className="bg-yellow-100 text-yellow-800 p-5 rounded-lg flex flex-col items-center">
                            <FileText className="w-6 h-6 mb-1" />
                            <p className="text-lg font-semibold">{instructor.totalQuizzes}</p>
                            <p className="text-sm">Quizzes</p>
                        </div>
                    </div>

                    {/* Courses */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Courses</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map(course => (
                                <div
                                    key={course.id}
                                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
                                >
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="h-36 w-full object-cover"
                                    />
                                    <div className="p-4 space-y-2">
                                        <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                                        <p className="text-sm text-gray-600">Lessons: {course.lessons}</p>
                                        <p className="text-sm text-gray-500">Enrolled: {course.enrolled} students</p>
                                        <button
                                            onClick={() => navigate(`/instructor-courses/${course.id}`) }
                                            className="mt-2 w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm"
                                        >
                                            View Course
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default InstructorProfilePage;
