import React, { useState } from "react";
import { Search, Eye, Pencil, Trash2, UserPlus } from "lucide-react";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import { useNavigate } from "react-router-dom";

const dummyInstructors = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        courses: 5,
        joined: "2023-04-12"
    },
    {
        id: 2,
        name: "Sara Smith",
        email: "sara@example.com",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg",
        courses: 3,
        joined: "2024-01-21"
    },
    {
        id: 3,
        name: "Ali Ahmad",
        email: "ali@example.com",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        courses: 8,
        joined: "2022-09-03"
    }
];

const ManageInstructorsPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [instructors, setInstructors] = useState(dummyInstructors);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const navigate = useNavigate();

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const filteredInstructors = instructors.filter((instructor) =>
        instructor.name.toLowerCase().includes(search.toLowerCase()) ||
        instructor.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = () => {
        setInstructors(instructors.filter((i) => i.id !== deleteTarget.id));
        setDeleteTarget(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} admin />

            <div className={`transition-all duration-300 ease-in-out pt-20 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
                <div className="px-6 py-10 max-w-7xl mx-auto space-y-8">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h1 className="text-3xl font-bold text-gray-800">Manage Instructors</h1>
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                placeholder="Search instructors..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="border border-gray-300 px-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 text-black"
                            />
                            <button onClick={() => { navigate('/add-instructor') }} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">
                                <UserPlus className="w-4 h-4 inline-block mr-1" /> Add Instructor
                            </button>
                        </div>
                    </div>

                    {/* Instructor Table */}
                    <div className="bg-white shadow-md rounded-xl overflow-x-auto">
                        <table className="w-full table-auto text-sm text-left text-gray-700">
                            <thead className="bg-gray-100 text-gray-600 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Instructor</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Courses</th>
                                    <th className="px-6 py-4">Joined</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInstructors.map((instructor) => (
                                    <tr key={instructor.id} className="border-b">
                                        <td className="px-6 py-4 flex items-center gap-3">
                                            <img src={instructor.avatar} className="w-10 h-10 rounded-full border" alt={instructor.name} />
                                            <span>{instructor.name}</span>
                                        </td>
                                        <td className="px-6 py-4">{instructor.email}</td>
                                        <td className="px-6 py-4">{instructor.courses}</td>
                                        <td className="px-6 py-4">{new Date(instructor.joined).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button onClick={() => { navigate(`/instructor-page/${instructor.id}`) }} className="text-black-600 hover:underline text-xs"><Eye className="w-4 h-4 inline" /></button>
                                            <button onClick={() => { navigate(`/add-instructor/${instructor.id}`) }} className="text-black-600 hover:underline text-xs"><Pencil className="w-4 h-4 inline" /></button>
                                            <button
                                                className="text-red-600 hover:underline text-xs"
                                                onClick={() => setDeleteTarget(instructor)}
                                            >
                                                <Trash2 className="w-4 h-4 inline" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredInstructors.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-6 text-center text-gray-500">No instructors found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            {deleteTarget && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">Delete Instructor</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete <span className="font-semibold">{deleteTarget.name}</span>? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteTarget(null)}
                                className="px-4 py-2 rounded-md text-sm border border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 rounded-md text-sm bg-red-600 text-white hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageInstructorsPage;
