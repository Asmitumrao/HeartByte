// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Register from './components/Register';
// import Login from './components/Login';
// import Home from './components/Home'
// import Dashboard from './Pages/Dashboard';
// import {AuthContext} from './context/AuthContext';
// import { useContext } from 'react';

// function App() {

//   const { user, loading} = useContext(AuthContext);
//   if (loading) {
//     return <div>Loading...</div>; // Show a loading state while checking authentication
//   }
//   if(user && user.role === 'doctor'){
//     return (
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<div>About Page</div>} />
//           <Route path="/contact" element={<div>Contact Page</div>} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </Router>
//     );
//   }
//   else if(user && user.role === 'patient'){
//     return (
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<div>About Page</div>} />
//           <Route path="/contact" element={<div>Contact Page</div>} />
//           <Route path="/reports" element={<div>Reports Page</div>} />
//         </Routes>
//       </Router>
//     );
//   }
//   else{
//     return (
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<div>About Page</div>} />
//           <Route path="/contact" element={<div>Contact Page</div>} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </Router>
//     );
//   }

// }

// export default App;
import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import Home from './components/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './Pages/Dashboard';
import Reports from './Pages/Reports';
import PageLoader from './components/PageLoader';

// Protected route: only accessible to authenticated users with allowed roles
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Public route: redirects logged-in users away from login/register pages
const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    const redirectPath = user.role === 'doctor' ? '/' : '/';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <PageLoader message="Setting up your experience..." />;
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth-only public routes (redirect if logged in) */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Doctor-only protected route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Patient-only protected route */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
