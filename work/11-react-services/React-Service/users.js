const users = {};

function isValidUsername(username) {
  return /^[A-Za-z0-9_]+$/.test(username);
}

function isValidWord(word) {
  return /^[A-Za-z0-9_]+$/.test(word);
}

function isValid(username) {
  return !!username && isValidUsername(username);
}

function hasUser(username) {
  return users.hasOwnProperty(username);
}

function addUser(username) {
  users[username] = { word: '' };
}

function getUserWord(username) {
  return users[username]?.word || '';
}

function setUserWord(username, word) {
  if (users[username]) {
    users[username].word = word;
  }
}

export default {
  isValidUsername,
  isValidWord,
  isValid,
  hasUser,
  addUser,
  getUserWord,
  setUserWord,
};
