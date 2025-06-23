import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import { BookOpen, Save, PlusCircle, Trash2 } from "lucide-react";
import { post } from "../../WebService/RequestBuilder";

const CreateModelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [lesson, setLesson] = useState({
    title: "",
    description: "",
    order: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("instructor.")) {
      const key = name.split(".")[1];
      setLesson({
        ...lesson,
        instructor: { ...lesson.instructor, [key]: value },
      });
    } else {
      setLesson({ ...lesson, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success } = await post("/modules", {
      ...lesson,
      course_id: id,
      order: +lesson.order || 1,
    });

    if (!success) {
      alert("Failed to create model. Please try again.");
      return;
    }
    navigate("/instructor-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <main
        className={`transition-all duration-300 ease-in-out pt-20 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <div className="px-6 py-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                {"Create New Model"}
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700">
                    order
                  </label>
                  <input
                    type="text"
                    name="order"
                    value={lesson.duration}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                    placeholder="describe the order of the model, e.g., 1, 2, 3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows="4"
                    value={lesson.material}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-md flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Create Model
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateModelPage;
