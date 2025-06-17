import React from 'react';
import { Bell, Sun, Moon, User, Menu } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
    const [darkMode, setDarkMode] = React.useState(false);

    return (
        <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
            <div className="px-4 py-3 lg:px-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        {/* Mobile menu button */}
                        <button
                            onClick={toggleSidebar}
                            className="p-2 mr-2 text-gray-600 rounded-lg lg:hidden hover:bg-gray-100"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        {/* <span className="font-semibold text-xl text-emerald-600">LMS Portal</span> */}
                    </div>

                    <div className="flex items-center space-x-2 md:space-x-4">
                        {/* Notification */}
                        {/* <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                            <Bell className="w-5 h-5 md:w-6 md:h-6" />
                        </button> */}

                        {/* User Profile */}
                        <div className="flex items-center space-x-2 md:space-x-3">
                            <span className="hidden md:block text-sm text-gray-700">John Doe</span>
                            <button className="p-1 bg-emerald-100 text-emerald-600 rounded-full">
                                <User className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;