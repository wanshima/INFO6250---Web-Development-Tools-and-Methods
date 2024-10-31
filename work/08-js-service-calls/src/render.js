import { PAGES } from './constants';

export default function render(state, rootEl) {
  const { page } = state;

  if (page === PAGES.LOGIN) {
    renderLoginView(state, rootEl);
  } else if (page === PAGES.WORD_VIEW) {
    renderWordView(state, rootEl);
  }
}

function renderLoginView(state, rootEl) {
  const { error } = state;

  const html = `
    ${error ? `<div class="error">${error}</div>` : ''}
    <form class="form" id="login-form">
      <label class="label" for="username">Enter Username:</label>
      <input class="input" type="text" name="username" id="username" required />
      <button class="button" type="submit">Login</button>
    </form>
  `;

  rootEl.innerHTML = html;
}

function renderWordView(state, rootEl) {
  const { username, storedWord, error } = state;

  const html = `
    <div class="nav">
      <span>Welcome, ${username}</span>
      <button class="button" id="logout-btn">Logout</button>
    </div>
    ${error ? `<div class="error">${error}</div>` : ''}
    <div class="content">
      <form class="form" id="word-form">
        <label class="label" for="word">Your Stored Word:</label>
        <input class="input" type="text" name="word" id="word" value="${storedWord}" />
        <button class="button" type="submit">Update Word</button>
      </form>
    </div>
  `;

  rootEl.innerHTML = html;
}
