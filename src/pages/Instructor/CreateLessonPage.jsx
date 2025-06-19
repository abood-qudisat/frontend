import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/ui/Navbar';
import Sidebar from '../../components/ui/Sidebar';
import { BookOpen, Save, PlusCircle, Trash2 } from 'lucide-react';

// Dummy pre-filled lesson (for edit simulation)
const dummyLessons = [
    {
        id: 1,
        title: "Introduction to React",
        duration: "15 min",
        material: "This is pre-filled material for editing.",
        instructor: {
            name: "John Doe",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        resources: [
            { name: "React Docs", link: "https://reactjs.org" }
        ],
        quizzes: [
            { id: 101, title: "Intro Quiz", questionCount: 5 }
        ]
    }
];

const CreateLessonPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const [lesson, setLesson] = useState({
        title: '',
        duration: '',
        material: '',
        analysis: '',
        instructor: { name: '', avatar: '' },
        resources: [{ name: '', link: '' }],
        quizzes: []
    });

    useEffect(() => {
        if (isEdit) {
            const found = dummyLessons.find(l => l.id === parseInt(id));
            if (found) setLesson(found);
        }
    }, [id, isEdit]);

    const handleResourceChange = (index, field, value) => {
        const updated = [...lesson.resources];
        updated[index][field] = value;
        setLesson({ ...lesson, resources: updated });
    };

    const addResource = () => {
        setLesson({ ...lesson, resources: [...lesson.resources, { name: '', link: '' }] });
    };

    const removeResource = (index) => {
        const updated = lesson.resources.filter((_, i) => i !== index);
        setLesson({ ...lesson, resources: updated });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('instructor.')) {
            const key = name.split('.')[1];
            setLesson({ ...lesson, instructor: { ...lesson.instructor, [key]: value } });
        } else {
            setLesson({ ...lesson, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Lesson:", lesson);
        navigate('/instructor/lessons');
    };

    return (
        <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <main className={`transition-all duration-300 ease-in-out pt-20 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
                <div className="px-6 py-8 max-w-4xl mx-auto">
                    <div className="bg-white p-6 rounded-xl shadow space-y-6">
                        <div className="flex items-center gap-2 mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">
                                {isEdit ? 'Edit Lesson' : 'Create New Lesson'}
                            </h1>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={lesson.title}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-emerald-500 text-black"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                                    <input
                                        type="text"
                                        name="duration"
                                        value={lesson.duration}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                                        placeholder="e.g. 15 min"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Material</label>
                                    <textarea
                                        name="material"
                                        rows="4"
                                        value={lesson.material}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Instructor Name</label>
                                        <input
                                            type="text"
                                            name="instructor.name"
                                            value={lesson.instructor.name}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Instructor Avatar URL</label>
                                        <input
                                            type="text"
                                            name="instructor.avatar"
                                            value={lesson.instructor.avatar}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                                        />
                                    </div>
                                </div>

                                {/* Resources Section */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Resources</label>
                                    {lesson.resources.map((res, index) => (
                                        <div key={index} className="flex gap-2 items-center mb-2">
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                value={res.name}
                                                onChange={(e) => handleResourceChange(index, 'name', e.target.value)}
                                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-black"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Link"
                                                value={res.link}
                                                onChange={(e) => handleResourceChange(index, 'link', e.target.value)}
                                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-black"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeResource(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addResource}
                                        className="text-emerald-600 hover:underline flex items-center text-sm"
                                    >
                                        <PlusCircle className="w-4 h-4 mr-1" />
                                        Add Resource
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-md flex items-center gap-2"
                            >
                                <Save className="w-5 h-5" />
                                {isEdit ? 'Update Lesson' : 'Create Lesson'}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateLessonPage;
