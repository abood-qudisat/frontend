import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Layout, FileText, PenTool, BarChart2, User, LogOut, ChevronLeft, X, } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  // const { logout, userType } = useAuth();
  const { logout, } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const userType = 'user';

  const menuItems = [
    { icon: Layout, label: "Dashboard", path: "/" },
    { icon: BookOpen, label: "My Courses", path: "/courses" },
    { icon: FileText, label: "Assignments", path: "/assignments" },
    { icon: PenTool, label: "Quizzes", path: "/quizzes" },
    // { icon: BarChart2, label: "Progress", path: "/progress" },
    // { icon: Bell, label: "Notifications", path: "/notifications" },
  ];

  const menuItemsAmin = [
    { icon: Layout, label: "Dashboard", path: "/instructor-dashboard" },
    { icon: User, label: "Assignments", path: "/instructor-assignments" },
  ]

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Modal Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
                fixed top-0 left-0 h-full z-50 bg-white border-r border-gray-200
                transform transition-all duration-300 ease-in-out w-[280px]
                ${isOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0 lg:w-20"
          }
                lg:z-30
            `}
      >
        <div className="flex flex-col h-full">
          {/* Brand / Title */}
          <div className="flex items-center justify-between px-6 py-4 h-16">
            <span
              className={`text-emerald-600 text-xl font-bold transition-all duration-300
                            ${!isOpen && "lg:hidden"}`}
            >
              LMS Portal
            </span>
            {/* Close button for mobile */}
            <button onClick={toggleSidebar} className="lg:hidden">
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex absolute right-0 top-7 transform translate-x-1/2 
                            bg-white border border-gray-300 rounded-full p-1.5 shadow-sm hover:shadow transition"
          >
            <ChevronLeft
              className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${!isOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {/* Menu */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
            {(userType == "admin" ? menuItemsAmin : menuItems).map(({ icon: Icon, label, path }) => (
              < Link
                key={path}
                to={path}
                onClick={() => {
                  // Close sidebar on mobile when clicking a link
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
                className={`group flex items-center px-4 py-2 rounded-lg transition
                                    ${isActive(path)
                    ? "bg-emerald-100 text-emerald-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-emerald-600"
                  }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span
                  className={`ml-3 text-sm transition-opacity duration-200
                                    ${!isOpen && "lg:hidden"}`}
                >
                  {label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-red-500 rounded-lg transition"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className={`ml-3 text-sm ${!isOpen && "lg:hidden"}`}>
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside >
    </>
  );
};

export default Sidebar;
