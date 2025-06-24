
import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/Admin/login', { username, password });
      localStorage.setItem('adminToken', res.data.token);
    } catch (err) {
      setError('שם משתמש או סיסמה שגויים');
    }
    finally{
navigate('/');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>התחברות למנהל</h2>
        {error && <div className="error">{error}</div>}
        <input
          type="text"
          placeholder="שם משתמש"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">התחבר</button>
      </form>
    </div>
  );
} 


