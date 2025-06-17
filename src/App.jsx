import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/ui/Navbar';
import './App.css';

import LoginPage from './pages/Auth/LoginPage';
import HomePage from './pages/User/HomePage';
import SignUpPage from './pages/Auth/SignUpPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';
import PrivacyPolicy from './pages/Auth/PrivacyPolicy';
import TermsOfService from './pages/Auth/TermsOfService';
import Dashboard from './pages/User/Dashboard';
import AssignmentsPage from './pages/User/AssignmentsPage';
import CoursesPage from './pages/User/CoursesPage';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />

        <Route path="/assignments" element={<AssignmentsPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
