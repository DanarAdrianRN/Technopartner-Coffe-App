import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Menu from './pages/Menu';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token_type = localStorage.getItem('token_type');
    const access_token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token_type && !!access_token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/menu" /> : <Login />} />
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/menu" element={isAuthenticated ? <Menu /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;