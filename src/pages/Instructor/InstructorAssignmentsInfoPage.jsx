import React, { useState } from "react";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import { Pencil, FileText, Eye, CheckCircle, XCircle } from "lucide-react";

const assignmentDetails = {
    id: 1,
    title: "React Hooks Assignment",
    description: "Build and explain a React component using useState and useEffect.",
    deadline: "2025-07-01",
    totalPoints: 100
};

const submittedStudents = [
    {
        id: 1,
        name: "Sara Khalil",
        file: "sara-hooks-assignment.pdf",
        submittedAt: "2025-06-28",
        grade: null
    },
    {
        id: 2,
        name: "Mohammad Odeh",
        file: "mohammad-react-hooks.zip",
        submittedAt: "2025-06-27",
        grade: 85
    }
];

const InstructorAssignmentsInfoPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const [students, setStudents] = useState(submittedStudents);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [gradeInput, setGradeInput] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleGrade = (student) => {
        setSelectedStudent(student);
        setGradeInput(student.grade || "");
        setShowModal(true);
    };

    const submitGrade = () => {
        setStudents(prev =>
            prev.map(s =>
                s.id === selectedStudent.id
                    ? { ...s, grade: Number(gradeInput) }
                    : s
            )
        );
        setShowModal(false);
        setSelectedStudent(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} admin />

            <div className={`transition-all duration-300 ease-in-out pt-20 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
                <div className="px-6 py-8 max-w-5xl mx-auto space-y-8">
                    
                    {/* Assignment Overview */}
                    <div className="bg-white p-6 rounded-xl shadow-md space-y-2 border-l-4 border-emerald-500">
                        <h1 className="text-2xl font-bold text-gray-800">{assignmentDetails.title}</h1>
                        <p className="text-gray-600">{assignmentDetails.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm pt-2 text-gray-700">
                            <span><strong>Deadline:</strong> {new Date(assignmentDetails.deadline).toLocaleDateString()}</span>
                            <span><strong>Total Points:</strong> {assignmentDetails.totalPoints}</span>
                        </div>
                    </div>

                    {/* Submissions */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">🧑‍🎓 Student Submissions</h2>
                        <div className="space-y-4">
                            {students.map((student) => (
                                <div key={student.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-all bg-gray-50">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{student.name}</h3>
                                        <p className="text-sm text-gray-600">Submitted on: {new Date(student.submittedAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                                        <a
                                            href={`/student-submitted-assignment/`} 
                                            rel="noreferrer"
                                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                                        >
                                            <Eye className="w-4 h-4" /> View File
                                        </a>

                                        {student.grade !== null ? (
                                            <span className="text-emerald-700 font-medium text-sm flex items-center gap-1">
                                                <CheckCircle className="w-4 h-4" /> {student.grade}/100
                                            </span>
                                        ) : (
                                            <span className="text-amber-600 text-sm italic flex items-center gap-1">
                                                <XCircle className="w-4 h-4" /> Not graded
                                            </span>
                                        )}

                                        <button
                                            onClick={() => handleGrade(student)}
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-lg text-sm flex items-center gap-2"
                                        >
                                            <Pencil className="w-4 h-4" /> Grade
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Grade Modal */}
                    {showModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
                            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Grade Submission</h3>
                                <p className="text-sm text-gray-600 mb-1"><strong>Student:</strong> {selectedStudent.name}</p>
                                <p className="text-sm text-gray-600 mb-4"><strong>File:</strong> {selectedStudent.file}</p>

                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 text-black"
                                    placeholder="Enter grade (0-100)"
                                    value={gradeInput}
                                    onChange={(e) => setGradeInput(e.target.value)}
                                />

                                <div className="flex justify-end gap-3">
                                    <button
                                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
                                        onClick={submitGrade}
                                    >
                                        Submit Grade
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstructorAssignmentsInfoPage;
