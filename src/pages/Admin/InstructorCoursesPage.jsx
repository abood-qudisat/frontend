import { useState } from "react";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import { Users, Edit3, FileText, BookOpen, Plus, Trash2 } from "lucide-react";

const course = {
    id: 1,
    title: "React Fundamentals",
    image: "https://images.unsplash.com/photo-1653387300291-bfa1eeb90e16?q=80&w=1740",
    description: "Learn the fundamentals of React including components, state, hooks, and JSX.",
    students: [
        { name: "Alice Johnson", email: "alice@example.com" },
        { name: "Bob Smith", email: "bob@example.com" }
    ],
    lessons: [
        { id: 1, title: "Intro to React", duration: "10 min" },
        { id: 2, title: "JSX Basics", duration: "15 min" }
    ],
    quizzes: 3,
    assignments: 2
};

const InstructorCoursesPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} admin />

            <div className={`transition-all duration-300 ease-in-out pt-20 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
                <div className="px-6 py-8 max-w-6xl mx-auto space-y-10">

                    <div className="rounded-xl overflow-hidden shadow-lg">
                        <img src={course.image} alt={course.title} className="w-full h-60 object-cover" />
                    </div>


                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-800">Manage Course: {course.title}</h1>
                        {/* <button
                            onClick={() => window.location.href = `/instructor/edit-course/${course.id}`}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1"
                        >
                            <Edit3 className="w-4 h-4" />
                            Edit Course
                        </button> */}
                    </div>

                    {/* Course Description */}
                    <div className="bg-white p-6 rounded-xl shadow space-y-2">
                        <h2 className="text-lg font-semibold text-gray-800">Course Description</h2>
                        <p className="text-gray-700 text-sm">{course.description}</p>
                    </div>

                    {/* Lessons */}
                    <div className="bg-white p-6 rounded-xl shadow space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-1">
                                <BookOpen className="w-5 h-5 text-emerald-600" /> Lessons
                            </h2>
                            {/* <button
                                onClick={() => window.location.href = `/instructor/add-lesson/${course.id}`}
                                className="text-sm bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-200"
                            >
                                <Plus className="w-4 h-4" />
                                Add Lesson
                            </button> */}
                        </div>

                        <ul className="divide-y divide-gray-200">
                            {course.lessons.map(lesson => (
                                <li key={lesson.id} className="flex justify-between items-center py-3">
                                    <div>
                                        <p className="font-medium text-gray-800">{lesson.title}</p>
                                        <span className="text-sm text-gray-500">{lesson.duration}</span>
                                    </div>
                                    {/* <div className="flex gap-2">
                                        <button
                                            onClick={() => window.location.href = `/instructor/edit-lesson/${lesson.id}`}
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button className="text-sm text-red-600 hover:underline">
                                            Delete
                                        </button>
                                    </div> */}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Assignments & Quizzes */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow space-y-2">
                            <div className="flex items-center gap-2 text-blue-600">
                                <FileText className="w-5 h-5" />
                                <h3 className="font-semibold text-gray-800">Assignments</h3>
                            </div>
                            <p className="text-gray-600 text-sm">{course.assignments} total assignments</p>
                            {/* <button
                                onClick={() => window.location.href = `/instructor/assignments/${course.id}`}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Manage Assignments
                            </button> */}
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow space-y-2">
                            <div className="flex items-center gap-2 text-yellow-600">
                                <FileText className="w-5 h-5" />
                                <h3 className="font-semibold text-gray-800">Quizzes</h3>
                            </div>
                            <p className="text-gray-600 text-sm">{course.quizzes} total quizzes</p>
                            {/* <button
                                onClick={() => window.location.href = `/instructor/quizzes/${course.id}`}
                                className="text-sm text-yellow-600 hover:underline"
                            >
                                Manage Quizzes
                            </button> */}
                        </div>
                    </div>

                    {/* Enrolled Students */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-1 mb-4">
                            <Users className="w-5 h-5 text-blue-600" />
                            Enrolled Students ({course.students.length})
                        </h2>

                        <ul className="divide-y divide-gray-200">
                            {course.students.map((student, index) => (
                                <li key={index} className="py-3 flex justify-between">
                                    <div>
                                        <p className="font-medium text-gray-800">{student.name}</p>
                                        <p className="text-sm text-gray-500">{student.email}</p>
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

export default InstructorCoursesPage;
