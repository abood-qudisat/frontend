import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/ui/Navbar';
import './App.css';

import LoginPage from './pages/Auth/LoginPage';
import HomePage from './pages/User/HomePage';
import SignUpPage from './pages/Auth/SignUpPage';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
