import {
  fetchLogin,
  fetchLogout,
  fetchMessages,
  fetchUsers,
  sendMessage,
} from './services';

import {
  waitOnLogin,
  login,
  logout,
  setMessages,
  setUsers,
  setError,
  state,
} from './state';

import { renderApp, renderMessagesAndUsers } from './render';

export function addEventListeners({ state, appEl }) {
  appEl.addEventListener('submit', (e) => {
    e.preventDefault();

    if (e.target.classList.contains('login__form')) {
      const username = e.target.elements['username'].value.trim();
      waitOnLogin();
      renderApp({ state, appEl });
      fetchLogin(username)
        .then(() => {
          login(username);
          renderApp({ state, appEl });
          startPolling({ state, appEl });
        })
        .catch((err) => {
          setError(err.error);
          renderApp({ state, appEl });
          });
    }
    
    if (e.target.classList.contains('message-form')) {
      const text = e.target.elements['message'].value.trim();
      sendMessage(text)
        .then(() => {
          e.target.reset();
          return fetchMessages(state.lastMessageId);
        })
        .then((newMessages) => {
          setMessages(newMessages);
          renderMessagesAndUsers(state);
        })
        .catch((err) => {
          setError(err.error);
          renderApp({ state, appEl });
        });
      }
    });

    appEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('controls__logout-button')) {
        logout();
        renderApp({ state, appEl });
        fetchLogout().catch((err) => {
          setError(err.error);
          renderApp({ state, appEl });
        });
      }
    });
    appEl.addEventListener('input', (e) => {
      if (e.target.classList.contains('login__username')) {
        state.username = e.target.value;
      }
    });
}
    
export function startPolling({ state, appEl }) {
  function poll() {
    if (!state.isLoggedIn) {
      return; 
    }
    Promise.all([fetchMessages(state.lastMessageId), fetchUsers()])
      .then(([newMessages, users]) => {
        setMessages(newMessages);
        setUsers(users);
        renderMessagesAndUsers(state);
        setTimeout(poll, 5000);
      })
      .catch((err) => {
        if (err.error === 'auth-missing') {
          logout();
          renderApp({ state, appEl });
        } else {
          setError(err.error);
          setTimeout(poll, 5000);
        }
      });
  }
  poll();
}
  
