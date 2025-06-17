import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ChevronRight, Filter, Search, CheckCircle, AlertCircle, FileText, Download, Upload, Eye, Edit3, Star, Menu, Bell, User } from 'lucide-react';
import Navbar from '../../components/ui/Navbar';
import Sidebar from '../../components/ui/Sidebar';

const Assignments = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const assignments = [
        {
            id: 1,
            title: "React Component Architecture Project",
            course: "React Advanced",
            type: "Project",
            status: "pending",
            dueDate: "2024-06-20",
            submittedDate: null,
            grade: null,
            maxPoints: 100,
            description: "Build a scalable component architecture using React hooks and context API",
            priority: "high"
        },
        {
            id: 2,
            title: "Database Design Quiz",
            course: "Node.js Fundamentals",
            type: "Quiz",
            status: "completed",
            dueDate: "2024-06-15",
            submittedDate: "2024-06-14",
            grade: 85,
            maxPoints: 100,
            description: "Test your knowledge of database design principles and normalization",
            priority: "medium"
        },
        {
            id: 3,
            title: "Security Vulnerability Assessment",
            course: "Web Security",
            type: "Assignment",
            status: "overdue",
            dueDate: "2024-06-10",
            submittedDate: null,
            grade: null,
            maxPoints: 75,
            description: "Identify and document security vulnerabilities in a web application",
            priority: "high"
        },
        {
            id: 4,
            title: "API Documentation Review",
            course: "Node.js Fundamentals",
            type: "Assignment",
            status: "submitted",
            dueDate: "2024-06-25",
            submittedDate: "2024-06-18",
            grade: null,
            maxPoints: 50,
            description: "Review and improve existing API documentation with examples",
            priority: "low"
        },
        {
            id: 5,
            title: "React Hooks Deep Dive",
            course: "React Advanced",
            type: "Essay",
            status: "pending",
            dueDate: "2024-06-30",
            submittedDate: null,
            grade: null,
            maxPoints: 80,
            description: "Write a comprehensive essay on advanced React hooks patterns",
            priority: "medium"
        }
    ];

    const filters = [
        { value: 'all', label: 'All Assignments', count: assignments.length },
        { value: 'pending', label: 'Pending', count: assignments.filter(a => a.status === 'pending').length },
        { value: 'submitted', label: 'Submitted', count: assignments.filter(a => a.status === 'submitted').length },
        { value: 'completed', label: 'Completed', count: assignments.filter(a => a.status === 'completed').length },
        { value: 'overdue', label: 'Overdue', count: assignments.filter(a => a.status === 'overdue').length }
    ];

    const filteredAssignments = assignments.filter(assignment => {
        const matchesFilter = selectedFilter === 'all' || assignment.status === selectedFilter;
        const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assignment.course.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-emerald-100 text-emerald-800';
            case 'submitted': return 'bg-blue-100 text-blue-800';
            case 'pending': return 'bg-amber-100 text-amber-800';
            case 'overdue': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            case 'submitted': return <Upload className="w-4 h-4" />;
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'overdue': return <AlertCircle className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'text-red-500';
            case 'medium': return 'text-amber-500';
            case 'low': return 'text-green-500';
            default: return 'text-gray-500';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getDaysUntilDue = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="min-h-screen  h-screen w-screen bg-gray-50 overflow-x-hidden">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content Area */}
            <div className={`transition-all duration-300 ease-in-out pt-16 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
                <div className="p-4 md:p-8 max-w-8xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-6 md:mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                            Assignments 📚
                        </h1>
                        <p className="text-gray-600">
                            Manage your assignments, track deadlines, and submit your work
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                        <div className="p-6">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {filters.map(filter => (
                                    <button
                                        key={filter.value}
                                        onClick={() => setSelectedFilter(filter.value)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedFilter === filter.value
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {filter.label} ({filter.count})
                                    </button>
                                ))}
                            </div>

                            {/* Search Bar */}
                            <div className="relative">
                                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search assignments..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Assignments List */}
                    <div className="space-y-4">
                        {filteredAssignments.map(assignment => (
                            <div key={assignment.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                        <div className="flex-1 mb-4 lg:mb-0">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <Star className={`w-5 h-5 ${getPriorityColor(assignment.priority)}`} />
                                                    <h3 className="text-lg font-semibold text-gray-800">{assignment.title}</h3>
                                                </div>
                                                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(assignment.status)}`}>
                                                    {getStatusIcon(assignment.status)}
                                                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                                                <span className="flex items-center gap-1">
                                                    <BookOpen className="w-4 h-4" />
                                                    {assignment.course}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FileText className="w-4 h-4" />
                                                    {assignment.type}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    Due {formatDate(assignment.dueDate)}
                                                </span>
                                                {assignment.status !== 'overdue' && (
                                                    <span className={`flex items-center gap-1 ${getDaysUntilDue(assignment.dueDate) <= 3 ? 'text-red-500' : ''}`}>
                                                        <Clock className="w-4 h-4" />
                                                        {getDaysUntilDue(assignment.dueDate) > 0
                                                            ? `${getDaysUntilDue(assignment.dueDate)} days left`
                                                            : getDaysUntilDue(assignment.dueDate) === 0
                                                                ? 'Due today'
                                                                : `${Math.abs(getDaysUntilDue(assignment.dueDate))} days overdue`
                                                        }
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-gray-600 mb-4">{assignment.description}</p>

                                            {assignment.grade !== null && (
                                                <div className="flex items-center gap-2 mb-4">
                                                    <span className="text-sm font-medium text-gray-600">Grade:</span>
                                                    <span className={`text-lg font-bold ${assignment.grade >= 90 ? 'text-emerald-600' : assignment.grade >= 80 ? 'text-blue-600' : assignment.grade >= 70 ? 'text-amber-600' : 'text-red-600'}`}>
                                                        {assignment.grade}/{assignment.maxPoints}
                                                    </span>
                                                    <div className="w-24 h-2 bg-gray-200 rounded-full ml-2">
                                                        <div
                                                            className={`h-2 rounded-full ${assignment.grade >= 90 ? 'bg-emerald-600' : assignment.grade >= 80 ? 'bg-blue-600' : assignment.grade >= 70 ? 'bg-amber-600' : 'bg-red-600'}`}
                                                            style={{ width: `${(assignment.grade / assignment.maxPoints) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap gap-2 lg:ml-6">
                                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm">
                                                <Eye className="w-4 h-4" />
                                                View Details
                                            </button>

                                            {assignment.status === 'pending' && (
                                                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm">
                                                    <Upload className="w-4 h-4" />
                                                    Submit
                                                </button>
                                            )}

                                            {assignment.status === 'submitted' && (
                                                <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm">
                                                    <Edit3 className="w-4 h-4" />
                                                    Edit Submission
                                                </button>
                                            )}

                                            {assignment.status === 'completed' && (
                                                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm">
                                                    <Download className="w-4 h-4" />
                                                    Download
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredAssignments.length === 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-800 mb-2">No assignments found</h3>
                            <p className="text-gray-600">
                                {searchTerm ? 'Try adjusting your search terms' : 'No assignments match the selected filter'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Assignments;