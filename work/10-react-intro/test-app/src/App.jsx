import { useState } from 'react';
import './App.css';
import Login from './Login.jsx';
import Game from './Game.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  function handleLogin(username) {
    setUsername(username);
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setUsername('');
    setIsLoggedIn(false);
  }

  return (
    <div className="app">
      {isLoggedIn ? (
        <Game username={username} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
