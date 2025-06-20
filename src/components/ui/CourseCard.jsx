import { Calendar, PlayCircle, Star } from "lucide-react";
import { post } from "../../WebService/RequestBuilder";
import { useAuth } from "../../contexts/AuthContext";

const CourseCard = ({ course }) => {
  const { user } = useAuth();
  const handleEnroll = () => {
    const { success, data } = post("/enrollments", {
      course_id: course.id,
      user_id: user.id,
      progress: 0, // Initial progress
    });

    if (success) {
      console.log("Enrollment successful:", data);
      // Optionally, you can redirect to the course page or show a success message
    } else {
      console.error("Enrollment failed:", data);
      // Optionally, you can show an error message to the user
    }
  };
  return (
    <div
      key={course.id}
      className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Course Image */}
      <div
        className="h-40 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${course.thumbnail_url})` }}
      />

      {/* Course Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-800">
            {course.title}
          </h2>
          <span className="text-emerald-600 font-bold text-sm">
            ${course.price}
          </span>
        </div>

        {/* Instructor */}
        {/* <div className="flex items-center mb-2">
                    <img src={course.instructorImg} alt={course.instructor} className="w-8 h-8 rounded-full mr-2" />
                    <p className="text-sm text-gray-700">{course.instructor}</p>
                </div> */}

        {/* Rating and Students */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <div className="flex items-center">
            <Star
              className="w-4 h-4 text-yellow-500 mr-1"
              fill="currentColor"
            />
            {3.5} / 5
          </div>
          <span>{5}+ students</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 text-left">
          {course.description}
        </p>

        {/* Date and Duration */}
        {/* <p className="text-sm text-gray-500 flex items-center mb-1">
          <Calendar className="w-4 h-4 mr-1" /> Starts: {course.startDate}
        </p>
        <p className="text-sm text-gray-500 flex items-center mb-4">
          <PlayCircle className="w-4 h-4 mr-1" /> Duration: {course.duration}
        </p> */}
        {/* </div> */}

        {/* Enroll Button */}
        <button
          onClick={handleEnroll}
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium 
                    hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                    focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl 
                    transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed
                    disabled:transform-none"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
