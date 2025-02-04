// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import TechnopartnerLogo from '../assets/logo technopartner.png';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('support@technopartner.id');
  const [password, setPassword] = useState('1234567');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await loginUser(email, password);
      if (data.access_token) {
        // Simpan token di localStorage
        localStorage.setItem('token_type', data.token_type);
        localStorage.setItem('access_token', data.access_token);
        // Navigasi ke halaman Home
        navigate('/home');
      } else {
        setError(data.error || 'Login gagal');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <a href={TechnopartnerLogo} target="_blank" rel="noopener noreferrer">
          <img src={TechnopartnerLogo} className="logo" alt="logo technopartner" />
        </a>
      </div>
      <form className="card" onSubmit={handleLogin}>
        <label>Email</label>
        <input type="text"/>
        <label>Password</label>
        <input type="password"/>
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;
