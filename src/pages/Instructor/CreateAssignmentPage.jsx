import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import { PlusCircle } from "lucide-react";

const CreateAssignmentPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        course: "",
        dueDate: "",
        totalPoints: "",
        description: "",
        status: "Open",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Assignment Created:", form);
        navigate("/instructor/assignments");
    };

    return (
        <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} admin />

            <div className={`transition-all duration-300 ease-in-out pt-20 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
                <div className="px-6 py-8 max-w-3xl mx-auto">
                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <div className="flex items-center gap-2 mb-6">
                            <h1 className="text-xl font-semibold text-gray-800">Create Assignment</h1>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Assignment Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Course</label>
                                <input
                                    type="text"
                                    name="course"
                                    value={form.course}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Due Date</label>
                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={form.dueDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Total Points</label>
                                    <input
                                        type="number"
                                        name="totalPoints"
                                        value={form.totalPoints}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Status</label>
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                                >
                                    <option value="Open">Open</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
                            >
                                Create Assignment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAssignmentPage;
