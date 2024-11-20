import { useState, useEffect } from 'react';
import './App.css';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchStoredWord,
  fetchUpdateStoredWord,
} from './services';

import LoginForm from './LoginForm';
import StoredWord from './StoredWord';
import Loading from './Loading';
import Status from './Status';

function App() {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [loginStatus, setLoginStatus] = useState('pending');
  const [storedWord, setStoredWord] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onLogin(username) {
    setIsLoading(true);
    fetchLogin(username)
      .then(() => {
        setError('');
        setUsername(username);
        setLoginStatus('loggedIn');
        return fetchStoredWord();
      })
      .then((data) => {
        setStoredWord(data.word);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err?.error || 'ERROR');
        setIsLoading(false);
      });
  }

  function onLogout() {
    setError('');
    setUsername('');
    setStoredWord('');
    setLoginStatus('notLoggedIn');
    fetchLogout().catch((err) => {
      setError(err?.error || 'ERROR');
    });
  }

  function onUpdateWord(newWord) {
    setIsLoading(true);
    fetchUpdateStoredWord(newWord)
      .then((data) => {
        setStoredWord(data.word);
        setError(''); 
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err?.error || 'ERROR');
        setIsLoading(false);
      });
  }

  function checkForSession() {
    fetchSession()
      .then((session) => {
        setUsername(session.username);
        setLoginStatus('loggedIn');
        return fetchStoredWord();
      })
      .then((data) => {
        setStoredWord(data.word);
      })
      .catch((err) => {
        if (err?.error === 'auth-missing') {
          setLoginStatus('notLoggedIn');
        } else {
          setError(err?.error || 'ERROR');
        }
      });
  }

  useEffect(() => {
    checkForSession();
  }, []);

  return (
    <div className="app">
      <main className="main">
        {error && <Status error={error} />}
        {loginStatus === 'pending' && <Loading>Loading user...</Loading>}
        {loginStatus === 'notLoggedIn' && <LoginForm onLogin={onLogin} />}
        {loginStatus === 'loggedIn' && (
          <div className="content">
            <p>Hello, {username}</p>
            <button onClick={onLogout} className="button">
              Logout
            </button>
            {isLoading && <Loading>Loading...</Loading>}
            {!isLoading && (
              <StoredWord
                storedWord={storedWord}
                onUpdateWord={onUpdateWord}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
