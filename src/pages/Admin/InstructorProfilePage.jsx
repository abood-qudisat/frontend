import { useState, useEffect } from "react";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import {
  BookOpen,
  Users,
  FileText,
  Mail,
  Calendar,
  User,
  Award,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { get } from "../../WebService/RequestBuilder";

const InstructorProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [instructor, setInstructor] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalQuizzes: 0,
    totalEnrollments: 0,
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const navigate = useNavigate();
  const { id } = useParams();

  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // Generate avatar colors based on name
  const getAvatarColor = (name) => {
    if (!name) return "bg-gray-500";
    const colors = [
      "bg-emerald-500",
      "bg-blue-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-teal-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Check if image should be shown
  const shouldShowImage = (instructor) => {
    return (
      instructor?.avatar &&
      instructor.avatar.trim() !== "" &&
      !imageError &&
      instructor.avatar !== "null" &&
      instructor.avatar !== "undefined"
    );
  };

  const fetchInstructorData = async () => {
    try {
      const { success, users } = await get(`/users`);

      if (success && users) {
        const instructorData = users.find((user) => user.id == id);
        if (instructorData) {
          setInstructor({
            id: instructorData.id,
            name: instructorData.name || "Unknown Instructor",
            email: instructorData.email || "No email provided",
            bio:
              instructorData.bio || "This instructor hasn't added a bio yet.",
            avatar: instructorData.avatar,
            joined: instructorData.created_at || new Date().toISOString(),
            isActive: instructorData.is_active ?? true,
            role: instructorData.role || "instructor",
          });
        } else {
          console.error("Instructor not found");
          // Handle instructor not found case
          navigate("/admin-instructors");
        }
      } else {
        console.error("Failed to fetch instructor data");
      }
    } catch (error) {
      console.error("Error fetching instructor data:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const { success, data } = await get(`/courses`);
      if (success && data) {
        const instructorCourses = data.filter(
          (course) => course.instructor_id == id
        );

        // Process courses with proper fallbacks
        const processedCourses = instructorCourses.map((course) => ({
          id: course.id,
          title: course.title || "Untitled Course",
          description: course.description || "No description available",
          image: course.thumbnail_url || null,
          lessons: course.lessons || 0,
          enrolled: course.enrolled || 0,
          price: course.price || 0,
          isPublished: course.is_published ?? false,
          isApproved: course.is_approved ?? false,
          createdAt: course.created_at,
        }));

        setCourses(processedCourses);

        // Calculate stats
        const totalEnrollments = processedCourses.reduce(
          (sum, course) => sum + (course.enrolled || 0),
          0
        );
        setStats({
          totalCourses: processedCourses.length,
          totalStudents: totalEnrollments,
          totalQuizzes: 0, // You might want to fetch this separately
          totalEnrollments: totalEnrollments,
        });
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchInstructorData(), fetchCourses()]);
      setIsLoading(false);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Avatar Component
  const InstructorAvatar = ({ instructor, size = "large" }) => {
    const sizeClasses = {
      small: "w-12 h-12",
      medium: "w-20 h-20",
      large: "w-28 h-28",
    };

    const textSizeClasses = {
      small: "text-lg",
      medium: "text-xl",
      large: "text-2xl",
    };

    if (shouldShowImage(instructor)) {
      return (
        <img
          src={instructor.avatar}
          alt={instructor.name}
          className={`${sizeClasses[size]} rounded-full border-4 border-emerald-600 object-cover`}
          onError={() => setImageError(true)}
        />
      );
    }

    // Fallback to initials
    return (
      <div
        className={`${
          sizeClasses[size]
        } rounded-full border-4 border-emerald-600 flex items-center justify-center text-white font-bold ${
          textSizeClasses[size]
        } ${getAvatarColor(instructor?.name)}`}
      >
        {getInitials(instructor?.name)}
      </div>
    );
  };

  // Course Card Component
  const CourseCard = ({ course }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200">
      {/* Course Image */}
      <div className="h-36 bg-gradient-to-r from-emerald-400 to-teal-500 relative overflow-hidden">
        {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}

        {/* Status Badges */}
        <div className="absolute top-2 right-2 flex gap-1">
          {!course.isPublished && (
            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
              Draft
            </span>
          )}
          {course.isPublished && !course.isApproved && (
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              Pending
            </span>
          )}
          {course.isApproved && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Live
            </span>
          )}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {course.title}
        </h3>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Price:</span>
            <span className="font-medium">${course.price}</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} admin />

        <div
          className={`transition-all duration-300 ease-in-out pt-20 ${
            sidebarOpen ? "lg:ml-64" : "lg:ml-20"
          }`}
        >
          <div className="px-6 py-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              <span className="ml-3 text-gray-600">
                Loading instructor profile...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} admin />

        <div
          className={`transition-all duration-300 ease-in-out pt-20 ${
            sidebarOpen ? "lg:ml-64" : "lg:ml-20"
          }`}
        >
          <div className="px-6 py-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Instructor Not Found
              </h2>
              <p className="text-gray-600 mb-4">
                The instructor profile you're looking for doesn't exist.
              </p>
              <button
                onClick={() => navigate("/manage-instructors")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Back to Instructors
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} admin />

      <div
        className={`transition-all duration-300 ease-in-out pt-20 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <div className="px-6 py-8 max-w-6xl mx-auto space-y-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/admin-instructors")}
            className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            ← Back to Instructors
          </button>

          {/* Instructor Profile Header */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <InstructorAvatar instructor={instructor} size="large" />

              <div className="flex-1 text-center md:text-left space-y-3">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {instructor.name}
                  </h1>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      instructor.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {instructor.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{instructor.email}</span>
                </div>

                <p className="text-gray-700 max-w-2xl">{instructor.bio}</p>

                <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Joined:{" "}
                    {new Date(instructor.joined).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            {courses.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  No Courses Yet
                </h3>
                <p className="text-gray-600 mb-4">
                  This instructor hasn't created any courses yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfilePage;
