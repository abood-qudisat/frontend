import { useState } from "react";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";

const ProfilePage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    // Normally this comes from auth/user context
    const [user, setUser] = useState({
        name: "Khaled Al-Lham",
        email: "khaled@example.com",
        avatar:
            "https://images.unsplash.com/flagged/photo-1563831175532-76e760e1d291?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "Student",
        joined: "2024-01-15",
        enrolledCourses: 5,
        completedQuizzes: 12,
        points: 980,
    });

    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        avatar: user.avatar,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setUser({ ...user, ...formData });
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className={`transition-all duration-300 ease-in-out pt-20 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
                <div className="px-6 py-8 max-w-4xl mx-auto">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-black px-5 py-2 rounded-lg text-sm"
                            >
                                Edit Profile
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <img src={user.avatar} alt={user.name} className="w-28 h-28 rounded-full border-4 border-emerald-600" />
                            <div className="text-center md:text-left">
                                <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                                <p className="text-gray-600 text-sm">{user.email}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Role: <span className="font-medium">{user.role}</span>
                                </p>
                                <p className="text-sm text-gray-500">
                                    Joined: <span className="font-medium">{new Date(user.joined).toLocaleDateString()}</span>
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="bg-emerald-100 text-emerald-800 p-4 rounded-lg text-center">
                                <h3 className="text-lg font-semibold">{user.enrolledCourses}</h3>
                                <p className="text-sm">Courses Enrolled</p>
                            </div>
                            <div className="bg-blue-100 text-blue-800 p-4 rounded-lg text-center">
                                <h3 className="text-lg font-semibold">{user.completedQuizzes}</h3>
                                <p className="text-sm">Quizzes Completed</p>
                            </div>
                            <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg text-center">
                                <h3 className="text-lg font-semibold">{user.points}</h3>
                                <p className="text-sm">Total Points</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Profile</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1 text-left">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1 text-left">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-emerald-600 hover:bg-emerald-700 text-black px-5 py-2 rounded-lg"
                            >
                                Save Changes
                            </button>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
