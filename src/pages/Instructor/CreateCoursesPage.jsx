import React, { useEffect, useState } from "react";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import { get, post } from "../../WebService/RequestBuilder";
import { useAuth } from "../../contexts/AuthContext";

const CreateCoursesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const { user } = useAuth();

  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    price: "",
    thumbnail_url: "",
  });

  const fetchCategories = async () => {
    const { data, success } = await get("/categories");
    if (success) {
      setCategories(data);
    } else {
      console.error("Failed to fetch categories");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit logic here (API call)
    const { success } = await post("/courses", {
      ...formData,
      instructor_id: user.id,
      category: formData.category_id,
    });
    console.log(success);

    if (success) {
      setFormData({
        title: "",
        description: "",
        category_id: "",
        price: "",
        thumbnail_url: "",
      });
      setImagePreview(null);
      // Redirect logic can be added here if needed
    } else {
      alert("Failed to create course. Please try again.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} admin />

      <div
        className={`transition-all duration-300 ease-in-out pt-20 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <div className="px-6 py-8 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Create a New Course
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
                className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Image
                </label>
                <input
                  type="text"
                  placeholder="image url"
                  name="thumbnail_url"
                  onChange={handleChange}
                  className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-3 w-full h-40 object-cover rounded-lg border"
                  />
                )}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition"
              >
                Create Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCoursesPage;
