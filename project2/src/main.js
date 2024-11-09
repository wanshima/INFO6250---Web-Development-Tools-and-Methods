import state from './state';
import { renderApp, renderMessagesAndUsers } from './render';
import { addEventListeners, startPolling } from './listeners';
import { fetchSession, fetchMessages, fetchUsers } from './services';
import { login, logout, setMessages, setUsers, setError } from './state';

const appEl = document.getElementById('app');

renderApp({ state, appEl });
addEventListeners({ state, appEl });

function checkForSession() {
  fetchSession()
    .then((session) => {
      state.isCheckingSession = false; 
      login(session.username);
      renderApp({ state, appEl });
      state.lastMessageId = session.latestMessageId;
      return Promise.all([fetchMessages(state.lastMessageId), fetchUsers()]);
    })
    .then(([newMessages, users]) => {
      setMessages(newMessages);
      setUsers(users);
      renderMessagesAndUsers(state);
      startPolling({ state, appEl });
    })
    .catch((err) => {
      state.isCheckingSession = false; 
      logout();
      if (err.error !== 'auth-missing') {
        setError(err.error || 'networkError');
      }
      renderApp({ state, appEl });
    });
}

checkForSession();
