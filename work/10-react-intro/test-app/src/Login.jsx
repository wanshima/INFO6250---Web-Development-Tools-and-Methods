import { useState } from 'react';

function Login({ onLogin }) {
  const [loginName, setLoginName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (loginName.trim() === '') {
      setErrorMessage('Username cannot be empty');
      return;
    }

    if (!/^[a-zA-Z0-9]+$/.test(loginName)) {
      setErrorMessage('Username is not made up of valid characters');
      return;
    }

    if (loginName === 'dog') {
      setErrorMessage('You are not a valid user');
      return;
    }

    setErrorMessage('');
    onLogin(loginName);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        <span>Username:</span>
        <input
          type="text"
          className="input"
          value={loginName}
          onChange={(e) => setLoginName(e.target.value)}
        />
      </label>
      <button type="submit" className="button">Login</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
}

export default Login;
