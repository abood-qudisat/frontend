import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

// Auth Components
import LoginPage from "./pages/Auth/LoginPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import PrivacyPolicy from "./pages/Auth/PrivacyPolicy";
import TermsOfService from "./pages/Auth/TermsOfService";

// Protected Components
import Dashboard from "./pages/User/Dashboard";
import AssignmentsPage from "./pages/User/AssignmentsPage";
import CoursesPage from "./pages/User/CoursesPage";
import HomePage from "./pages/User/HomePage";
import QuizzesPage from "./pages/User/QuizzesPage";

// Context
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ExamPage from "./pages/User/ExamPage";
import QuizResultPage from "./pages/User/QuizResultPage";
import ProfilePage from "./pages/User/ProfilePage";
import InstructorDashboard from "./pages/Instructor/InstructorDashboard";
import CreateCoursesPage from "./pages/Instructor/CreateCoursesPage";
import CoursePage from "./pages/User/CoursePage";
import InstructorQuizzesPage from "./pages/Instructor/InstructorQuizzesPage";
import CreateQuizPage from "./pages/Instructor/CreateQuizPage";
import QuizInfoPage from "./pages/Instructor/QuizInfoPage";
import InstructorAssignmentsPage from "./pages/Instructor/InstructorAssignmentsPage";
import CreateAssignmentPage from "./pages/Instructor/CreateAssignmentPage";
import LessonsPage from "./pages/User/lessonsPage";
import CreateLessonPage from "./pages/Instructor/CreateLessonPage";
import InstructorAssignmentsInfoPage from "./pages/Instructor/InstructorAssignmentsInfoPage";
import StudentSubmittedAssignmentPage from "./pages/Instructor/StudentSubmittedAssignmentPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageInstructorsPage from "./pages/Admin/ManageInstructorsPage";
import AddInstructorPage from "./pages/Admin/ AddInstructorPage";
import InstructorProfilePage from "./pages/Admin/InstructorProfilePage";
import AdminCoursesPage from "./pages/Admin/InstructorCoursesPage";
import AdminManageUsersPage from "./pages/Admin/AdminUsersPage";
import AdminUserDetailsPage from "./pages/Admin/AdminUserDetailsPage";
import InstructorCoursesPage from "./pages/Instructor/InstructorCoursesPage";
import CreateModelPage from "./pages/Instructor/CreateModelPage";
import InstructorLessonsPage from "./pages/Instructor/InstructorlessonsPage";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isLoggedIn, userType, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access if roles are specified
  if (allowedRoles.length > 0 && !allowedRoles.includes(userType)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const { isLoggedIn, userType, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // Redirect to appropriate dashboard if already logged in
  if (isLoggedIn) {
    const dashboardPath =
      userType === "admin"
        ? "/dashboard-admin"
        : userType === "instructor"
        ? "/dashboard-instructor"
        : "/dashboard-student";

    return <Navigate to={dashboardPath} replace />;
  }

  return children;
};

// Unauthorized Component
const UnauthorizedPage = () => {
  const { userType } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>
        <Navigate
          to={
            userType === "admin"
              ? "/dashboard-admin"
              : userType === "instructor"
              ? "/dashboard-instructor"
              : "/dashboard-student"
          }
          replace
        />
      </div>
    </div>
  );
};

// Main App Component
function AppContent() {
  return (
    <Router>
      <Routes>
        {/* Public Routes - Redirect if already logged in */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          }
        />

        {/* Static Pages - Always accessible */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Protected Routes - Require authentication */}
        <Route
          path="/dashboard-student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-instructor"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}>
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Course and Assignment Routes */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor"]}>
              <CoursesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assignments"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor"]}>
              <AssignmentsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quizzes"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor"]}>
              <QuizzesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exam"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor"]}>
              <ExamPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz-result"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor"]}>
              <QuizResultPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor"]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-courses"
          element={
            <ProtectedRoute allowedRoles={["student", "instructor"]}>
              <CreateCoursesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/course-instructor/:id"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}>
              <InstructorCoursesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-model-instructor/:id"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}>
              <CreateModelPage />
            </ProtectedRoute>
          }
        />

        {/*  */}

        <Route
          path="/instructor-quizzes/:id"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}>
              <InstructorQuizzesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor-lessons/:id"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}>
              <InstructorLessonsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-quizzes"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}>
              <CreateQuizPage />
            </ProtectedRoute>
          }
        />

        {/* Home/Landing Page */}
        <Route
          path="/quiz-info"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}>
              <QuizInfoPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}>
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-assignment"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}>
              <CreateAssignmentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor-assignments"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}>
              <InstructorAssignmentsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor-assignments-info"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}>
              <InstructorAssignmentsInfoPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-lesson"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}>
              <CreateLessonPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-lesson/:id?"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}>
              <CreateLessonPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-submitted-assignment/:id?"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}>
              <StudentSubmittedAssignmentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-instructors"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageInstructorsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-instructor/:id?"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddInstructorPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor-page/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <InstructorProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminManageUsersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-users-details/:id?"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminUserDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor-courses/:id?"
          element={
            // <ProtectedRoute allowedRoles={["student", "instructor", "admin"]}>
            <InstructorCoursesPage />
            // </ProtectedRoute>
          }
        />

        {/* Default Route - Redirect based on auth status */}
        <Route path="/" element={<DefaultRedirect />} />

        {/* Catch all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

// Default Redirect Component
const DefaultRedirect = () => {
  const { isLoggedIn, userType, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (isLoggedIn) {
    const dashboardPath =
      userType === "admin"
        ? "/dashboard-admin"
        : userType === "instructor"
        ? "/instructor-dashboard"
        : "/dashboard-student";

    return <Navigate to={dashboardPath} replace />;
  }

  return <Navigate to="/login" replace />;
};

// 404 Not Found Component
const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist.
        </p>
        <Navigate to="/" replace />
      </div>
    </div>
  );
};

// Main App with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
