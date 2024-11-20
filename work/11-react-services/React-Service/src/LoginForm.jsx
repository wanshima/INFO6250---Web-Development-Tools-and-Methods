import { useState } from 'react';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');

  function onChange(e) {
    setUsername(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (username) {
      onLogin(username);
    }
  }

  return (
    <div className="login">
      <form className="login-form" action="#/login" onSubmit={onSubmit}>
        <label>
          <span>Username:</span>
          <input
            className="input"
            value={username}
            onChange={onChange}
          />
        </label>
        <button className="button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
