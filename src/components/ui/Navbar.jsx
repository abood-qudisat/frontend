import React, { useState } from "react";
import {
  Bell,
  Sun,
  Moon,
  User,
  Menu,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const { user, userType, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const handleLogout = () => {
    logout();
    navigate("/login");
    setDropdownOpen(false);
  };

  const handleProfileClick = () => {
    // Navigate to profile page when implemented
    setDropdownOpen(false);
    navigate('/profile');
  };

  const getUserDisplayName = () => {
    if (!user) return "Guest";
    return user.name || user.firstName || user.email?.split("@")[0] || "User";
  };

  const getUserRole = () => {
    if (!userType) return "";
    return userType.charAt(0).toUpperCase() + userType.slice(1);
  };

  const getInitials = () => {
    const name = getUserDisplayName();
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0 shadow-sm">
      <div className="px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              onClick={toggleSidebar}
              className="p-2 mr-2 text-gray-600 rounded-lg lg:hidden hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo/Brand - uncomment if needed */}
            {/* <span className="font-semibold text-xl text-emerald-600">LMS Portal</span> */}
          </div>

          <div className="flex items-center space-x-4 md:space-x-4">

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 md:space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {/* User Info */}
                <div className="hidden md:block text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {getUserDisplayName()}
                  </div>
                  <div className="text-xs text-gray-500">{getUserRole()}</div>
                </div>

                {/* Avatar */}
                <div className="relative">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={getUserDisplayName()}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-emerald-200"
                    />
                  ) : (
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center border-2 border-emerald-200 font-medium text-sm">
                      {getInitials()}
                    </div>
                  )}

                  {/* Online Status Indicator */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                </div>

                {/* Dropdown Arrow */}
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setDropdownOpen(false)}
                  ></div>

                  {/* Dropdown Content */}
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">

                        <div>
                          <div className="font-medium text-gray-900 text-left">
                            {getUserDisplayName()}
                          </div>
                          <div className="text-sm text-gray-500 text-left">
                            {user?.email}
                          </div>
                          <div className="text-xs text-emerald-600 font-medium text-left">
                            {getUserRole()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={handleProfileClick}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>View Profile</span>
                      </button>

                      <button
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
