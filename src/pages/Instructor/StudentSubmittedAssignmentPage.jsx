import React, { useState } from "react";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import {
    FileText, Calendar, Star, MessageSquare,
    Download, Pencil, Save, X
} from "lucide-react";

const initialSubmission = {
    studentName: "Sara Khalil",
    fileName: "sara-hooks-assignment.pdf",
    submittedAt: "2025-06-28T15:32:00",
    grade: 92,
    feedback: "Great work! Clear code and good explanation of useEffect.",
    assignment: {
        title: "React Hooks Assignment",
        description: "Build and explain a React component using useState and useEffect.",
        deadline: "2025-07-01",
        totalPoints: 100
    }
};

const StudentSubmittedAssignmentPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const [submission, setSubmission] = useState(initialSubmission);
    const [isEditing, setIsEditing] = useState(false);
    const [editGrade, setEditGrade] = useState(submission.grade);
    const [editFeedback, setEditFeedback] = useState(submission.feedback);

    const saveChanges = () => {
        setSubmission(prev => ({
            ...prev,
            grade: editGrade,
            feedback: editFeedback
        }));
        setIsEditing(false);
    };

    const cancelEdit = () => {
        setEditGrade(submission.grade);
        setEditFeedback(submission.feedback);
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} admin />

            <div className={`transition-all duration-300 ease-in-out pt-20 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
                <div className="px-6 py-10 max-w-4xl mx-auto space-y-10">

                    {/* Assignment Info */}
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-emerald-600">
                        <h1 className="text-2xl font-bold text-gray-800">{submission.assignment.title}</h1>
                        <p className="text-gray-600 mt-2">{submission.assignment.description}</p>
                        <div className="flex gap-6 mt-4 text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span><strong>Deadline:</strong> {new Date(submission.assignment.deadline).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4" />
                                <span><strong>Total Points:</strong> {submission.assignment.totalPoints}</span>
                            </div>
                        </div>
                    </div>

                    {/* Student Submission */}
                    <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">📁 Submission by {submission.studentName}</h2>
                            <span className="text-sm text-gray-500">Submitted on: {new Date(submission.submittedAt).toLocaleString()}</span>
                        </div>

                        {/* File preview & download */}
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-gray-500" />
                                <a href={`/${submission.fileName}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                    {submission.fileName}
                                </a>
                            </div>
                            <a
                                href={`/${submission.fileName}`}
                                download
                                className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-800"
                            >
                                <Download className="w-4 h-4" /> Download
                            </a>
                        </div>

                        {/* Grade & Feedback */}
                        <div className="mt-6">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-500" /> Grade & Feedback
                                </h3>
                                {!isEditing && (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="text-sm text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
                                    >
                                        <Pencil className="w-4 h-4" /> Edit
                                    </button>
                                )}
                            </div>

                            {isEditing ? (
                                <div className="space-y-4">
                                    <input
                                        type="number"
                                        value={editGrade}
                                        onChange={(e) => setEditGrade(Number(e.target.value))}
                                        min={0}
                                        max={100}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                                        placeholder="Enter grade (0-100)"
                                    />
                                    <textarea
                                        value={editFeedback}
                                        onChange={(e) => setEditFeedback(e.target.value)}
                                        rows={4}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                                        placeholder="Write feedback..."
                                    />
                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={cancelEdit}
                                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-1"
                                        >
                                            <X className="w-4 h-4" /> Cancel
                                        </button>
                                        <button
                                            onClick={saveChanges}
                                            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-1"
                                        >
                                            <Save className="w-4 h-4" /> Save
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-lg">
                                    <p className="text-sm text-gray-700 mb-2">
                                        <strong>Grade:</strong> {submission.grade} / {submission.assignment.totalPoints}
                                    </p>
                                    <div className="flex items-center gap-2 mb-1">
                                        <MessageSquare className="w-4 h-4 text-emerald-600" />
                                        <h4 className="font-medium text-gray-800">Instructor Feedback</h4>
                                    </div>
                                    <p className="text-sm text-gray-700">{submission.feedback}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentSubmittedAssignmentPage;
