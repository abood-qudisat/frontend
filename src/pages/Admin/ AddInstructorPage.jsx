import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import { post } from "../../WebService/RequestBuilder";

const AddInstructorPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registrationData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      role: "instructor",
    };

    // Here you'd typically call your API to create the instructor
    // Example: await axios.post('/api/instructors', formData)

    console.log("Submitted Instructor:", formData);
    setSubmitted(true);

    const { success } = await post("/users/register", { ...registrationData });

    if (success) {
      navigate("/admin/manage-instructors");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} admin />

      <div
        className={`transition-all duration-300 ease-in-out pt-20 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <div className="px-6 py-10 max-w-3xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Add New Instructor
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-md space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium 
                            hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                            focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl 
                            transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              Add Instructor
            </button>
          </form>

          {submitted && (
            <div className="text-center text-green-600 font-medium">
              ✅ Instructor added successfully! Redirecting...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddInstructorPage;
