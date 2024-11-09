const activeUsers = {};

function isValid(username) {
  return /^[A-Za-z0-9_]+$/.test(username);
}

function isPermitted(username) {
  return username !== 'dog';
}

function addActiveUser(username) {
  activeUsers[username] = (activeUsers[username] || 0) + 1;
}

function removeActiveUser(username) {
  if (activeUsers[username]) {
    activeUsers[username] -= 1;
    if (activeUsers[username] <= 0) {
      delete activeUsers[username];
    }
  }
}

function getActiveUsers() {
  return Object.keys(activeUsers);
}

module.exports = {
  isValid,
  isPermitted,
  addActiveUser,
  removeActiveUser,
  getActiveUsers,
};
