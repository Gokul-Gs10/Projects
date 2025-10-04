import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Example validation (replace with real API call)
    if (username === 'user123' && password === 'password123') {
      // Clear error and navigate to tracker
      setErrorMessage('');
      navigate('/tracker');
    } else {
      setErrorMessage('Invalid username or password.');
    }
  };

  return (
    <div className="auth-page">
      <header>
        <div className="logo">
          <h1>FitLife360</h1>
        </div>
        <nav>
          <a href="/">Home</a>
        </nav>
      </header>

      <section className="auth-section">
        <div className="auth-container single-container">
          <div className="form-container">
            <h2>Welcome Back!</h2>
            <p className="login-subtitle">Log in to continue your fitness journey.</p>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form id="loginForm" onSubmit={handleLogin}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
            <p className="forgot-links">
              <a href="#">Forgot Password?</a> | <a href="#">Forgot Username?</a>
            </p>
          </div>
        </div>
      </section>

      <footer>
        <p>
          &copy; 2024 FitLife360. All rights reserved. |{' '}
          <a href="#">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;
