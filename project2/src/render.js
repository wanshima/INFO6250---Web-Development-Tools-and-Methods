function renderApp({ state, appEl }) {
  const html = `
    <main>
      ${generateStatusHtml(state)}
      ${generateLoginHtml(state)}
      ${generateChatContainer(state)}
    </main>
  `;
  appEl.innerHTML = html;

  if (state.isLoggedIn) {
    renderMessagesAndUsers(state);
  }
}

function generateLoginHtml(state) {
  if (state.isCheckingSession) {
    return `
      <div class="login__waiting">Checking session...</div>
    `;
  }
  if (state.isLoginPending) {
    return `
      <div class="login__waiting">Loading user...</div>
    `;
  }
  if (state.isLoggedIn) {
    return ``;
  }
  const usernameValue = state.username || '';
  return `
    <div class="login">
      <form class="login__form">
        <label>
          <span>Username:</span>
          <input class="login__username" name="username" required value="${usernameValue}">
        </label>
        <button type="submit" class="login__button">Login</button>
      </form>
    </div>
  `;
}

function renderMessagesAndUsers(state) {
  const usersContainer = document.querySelector('.users-list-container');
  const messagesContainer = document.querySelector('.messages-container');

  if (usersContainer) {
    usersContainer.innerHTML = generateUsersHtml(state);
  }

  if (messagesContainer) {
    messagesContainer.innerHTML = generateMessagesHtml(state);
    scrollMessagesToBottom();
  }
}

function generateStatusHtml(state) {
  return `
    <div class="status">${state.error}</div>
  `;
}

function generateChatContainer(state) {
  if (!state.isLoggedIn) {
    return ``;
  }
  return `
    <div class="chat">
      ${generateControlsHtml()}
      <div class="chat-content">
        <div class="users-list-container">
          <!-- Users will be rendered here -->
        </div>
        <div class="messages-container">
          <!-- Messages will be rendered here -->
        </div>
      </div>
      ${generateMessageInputHtml()}
    </div>
  `;
}

function generateControlsHtml() {
  return `
    <div class="controls">
      <button class="controls__logout-button">Logout</button>
    </div>
  `;
}

function generateUsersHtml(state) {
  const usersHtml = state.users.map((user) => `<li>${user}</li>`).join('');
  return `
    <div class="users-list">
      <h3>Active Users</h3>
      <ul>
        ${usersHtml}
      </ul>
    </div>
  `;
}

function generateMessagesHtml(state) {
  if (state.isLoadingMessages) {
    return `<div class="messages__waiting">Loading messages...</div>`;
  }
  const messagesHtml = state.messages
    .map(
      (message) => `
    <div class="message">
      <span class="username">${message.username}:</span> ${message.text}
    </div>
  `
    )
    .join('');
  return `
    <div class="messages-list">
      ${messagesHtml}
    </div>
  `;
}

function generateMessageInputHtml() {
  return `
    <form class="message-form">
      <input class="message-input" name="message" placeholder="Type a message" required>
      <button type="submit" class="message-form__button">Send</button>
    </form>
  `;
}

function scrollMessagesToBottom() {
  const messagesContainer = document.querySelector('.messages-container');
  if (messagesContainer) {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}

export { renderApp, renderMessagesAndUsers };
