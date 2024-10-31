import state, {
  updateUsername,
  updateStoredWord,
  updateError,
  changePage,
  resetState,
} from './state';
import {
  fetchSession,
  loginUser,
  logoutUser,
  fetchStoredWord,
  updateWord,
} from './services';
import render from './render';
import { PAGES } from './constants';
import { MESSAGES } from './messages';
  
const rootEl = document.querySelector('#app');
render(state, rootEl);
  
rootEl.addEventListener('click', (e) => {
  if (e.target.id === 'logout-btn') {
    handleLogout();
    return;
  }
});
  
rootEl.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (e.target.id === 'login-form') {
    const username = e.target.elements['username'].value.trim();
    handleLogin(username);
    return;
  }
  
  if (e.target.id === 'word-form') {
    const word = e.target.elements['word'].value.trim();
    handleUpdateStoredWord(word);
    return;
  }
});
  
function handleLogin(username) {
  loginUser(username)
    .then((data) => {
      updateUsername(data.username);
      return handleFetchStoredWord();
    })
    .catch((err) => {
      const errorMsg = MESSAGES[err.error] || MESSAGES.default;
      updateError(errorMsg);
      render(state, rootEl);
    });
}
  
function handleLogout() {
  logoutUser()
    .then(() => {
      resetState();
      changePage(PAGES.LOGIN);
      render(state, rootEl);
    })
    .catch((err) => {
      const errorMsg = MESSAGES[err.error] || MESSAGES.default;
      updateError(errorMsg);
      render(state, rootEl);
    });
}
  
function handleFetchStoredWord() {
  return fetchStoredWord()
    .then((data) => {
      updateStoredWord(data.storedWord);
      updateError('');
      changePage(PAGES.WORD_VIEW);
      render(state, rootEl);
    })
    .catch((err) => {
      const errorMsg = MESSAGES[err.error] || MESSAGES.default;
      updateError(errorMsg);
      render(state, rootEl);
    });
}
  
function handleUpdateStoredWord(word) {
  updateWord(word)
    .then((data) => {
      updateStoredWord(data.storedWord);
      updateError('');
      render(state, rootEl);
    })
    .catch((err) => {
      const errorMsg = MESSAGES[err.error] || MESSAGES.default;
      updateError(errorMsg);
      render(state, rootEl);
    });
}
  
function checkForSession() {
  fetchSession()
    .then((data) => {
      updateUsername(data.username);
      return handleFetchStoredWord();
    })
    .catch(() => {
      render(state, rootEl);
    });
}
  
checkForSession();
  