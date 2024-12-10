import { useState } from 'react';
import './App.css'; 

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  function handleChange(e) {
    setUsername(e.target.value);
    if (error) setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim()) {
      setError('Username cannot be empty.');
      return;
    }
    onLogin(username.trim());
  }

  return (
    <div className="login">
      <h2 className="welcome-message">Welcome to the Second-Hand Goods Trading Platform. Please log in.</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="login-input"
          value={username}
          onChange={handleChange}
          placeholder="Enter username"
        />
        {error && <div className="error">{error}</div>}
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
