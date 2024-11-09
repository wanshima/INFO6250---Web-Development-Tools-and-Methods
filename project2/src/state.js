import { MESSAGES } from './constants';

const state = {
    messages: [],
    users: [],
    isLoggedIn: false,
    isLoginPending: false,
    isCheckingSession: true, 
    username: '',
    error: '',
    isLoadingMessages: false,
    lastMessageId: 0,
  };

export function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.messages = [];
  state.users = [];
  state.error = '';
  state.lastMessageId = 0;
}

export function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
}

export function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.messages = [];
  state.users = [];
  state.error = '';
  state.lastMessageId = 0;
}

export function waitOnMessages() {
  state.isLoadingMessages = true;
  state.error = '';
}

export function setMessages(newMessages) {
  if (Array.isArray(newMessages) && newMessages.length > 0) {
      state.messages = [...state.messages, ...newMessages];
      const latestMessage = newMessages[newMessages.length - 1];
      state.lastMessageId = latestMessage.id;
  }
  state.isLoadingMessages = false;
  state.error = '';
}

export function setUsers(users) {
  state.users = users;
  state.error = '';
}

export function addMessage(message) {
  state.messages.push(message);
  state.error = '';
}

export function setError(error) {
  if (!error) {
    state.error = '';
    return;
  }
  state.isLoginPending = false;
  state.error = MESSAGES[error] || MESSAGES.default;
}

export default state;
