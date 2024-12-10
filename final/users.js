const users = {};

function isValid(username) {
  if (typeof username !== 'string') return false;
  return /^[A-Za-z0-9_]+$/.test(username.trim());
}

function getUserData(username) {
  return users[username] || null;
}

function addUserData(username, userData) {
  users[username] = userData;
}

export default {
  isValid,
  getUserData,
  addUserData,
};
