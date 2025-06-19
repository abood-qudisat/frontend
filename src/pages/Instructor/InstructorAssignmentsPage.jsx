import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import { Calendar, Users, FileText, PlusCircle, Trash2 } from "lucide-react";

const assignments = [
    // Sample assignments (you can fetch from API)
    {
        id: 1,
        title: "React Hooks Assignment",
        course: "React Fundamentals",
        dueDate: "2025-07-10",
        totalSubmissions: 12,
        totalPoints: 100,
        status: "Open",
    },
    {
        id: 2,
        title: "Node API Project",
        course: "Node.js Mastery",
        dueDate: "2025-07-18",
        totalSubmissions: 9,
        totalPoints: 120,
        status: "Closed",
    },
    {
        id: 3,
        title: "UI/UX Wireframe Task",
        course: "Design Basics",
        dueDate: "2025-07-22",
        totalSubmissions: 7,
        totalPoints: 80,
        status: "Open",
    },
    {
        id: 4,
        title: "Express API Security",
        course: "Node.js Mastery",
        dueDate: "2025-07-25",
        totalSubmissions: 5,
        totalPoints: 90,
        status: "Closed",
    },
];

const statusColor = {
    Open: "text-emerald-600 bg-emerald-100",
    Closed: "text-red-600 bg-red-100",
};

const InstructorAssignmentsPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filter, setFilter] = useState("All");
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const navigate = useNavigate();
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const filteredAssignments = assignments.filter((a) =>
        filter === "All" ? true : a.status === filter
    );

    const perPage = 3;
    const totalPages = Math.ceil(filteredAssignments.length / perPage);
    const paginatedAssignments = filteredAssignments.slice(
        (page - 1) * perPage,
        page * perPage
    );

    const handleDelete = (id) => {
        setModalOpen(true);
        setSelectedId(id);
    };

    const confirmDelete = () => {
        // Implement actual deletion here
        console.log("Deleted assignment:", selectedId);
        setModalOpen(false);
        setSelectedId(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} admin />

            <div className={`transition-all duration-300 ease-in-out pt-20 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
                <div className="px-6 py-8 max-w-6xl mx-auto space-y-8">

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-semibold text-gray-800">Assignments</h1>
                            <p className="text-sm text-gray-600">Manage assignments for your courses</p>
                        </div>
                        <button
                            onClick={() => navigate("/create-assignment")}
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium 
                                    hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                                    focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center
                                    transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed gap-5
                                    disabled:transform-none"
                        >
                            <PlusCircle className="w-4 h-4" /> Create Assignment
                        </button>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-3">
                        {["All", "Open", "Closed"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${filter == status ? "bg-emerald-600 text-white" : "bg-emerald text-emerald-700 border border-gray-200"
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    {/* Assignment Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedAssignments.map((assignment) => (
                            <div
                                key={assignment.id}
                                className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition relative"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-bold text-gray-800">{assignment.title}</h2>
                                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${statusColor[assignment.status]}`}>
                                        {assignment.status}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-600 flex items-center mb-1">
                                    <FileText className="w-4 h-4 mr-1" /> Course: <span className="ml-1 font-medium">{assignment.course}</span>
                                </p>
                                <p className="text-sm text-gray-600 flex items-center mb-1">
                                    <Calendar className="w-4 h-4 mr-1" /> Due: {new Date(assignment.dueDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600 flex items-center mb-4">
                                    <Users className="w-4 h-4 mr-1" /> Submissions: {assignment.totalSubmissions}
                                </p>

                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Points: {assignment.totalPoints}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => navigate(`/instructor/assignments/${assignment.id}`)}
                                            className="text-emerald-600 hover:underline text-sm font-medium"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleDelete(assignment.id)}
                                            className="text-red-500 hover:text-red-600 text-sm"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-4">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setPage(num)}
                                    className={`px-4 py-2 text-sm rounded-lg border ${num === page ? "bg-emerald-600 text-white" : "bg-white text-gray-700 border-gray-200"
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Confirm Deletion</h2>
                        <p className="text-sm text-gray-600 mb-4">Are you sure you want to delete this assignment?</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded-lg text-sm">Cancel</button>
                            <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-black rounded-lg text-sm">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InstructorAssignmentsPage;
