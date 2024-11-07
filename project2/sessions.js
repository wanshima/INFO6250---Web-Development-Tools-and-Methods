const crypto = require('crypto');

const sessions = {};

function addSession(username) {
  const sid = crypto.randomBytes(16).toString('hex'); 
  sessions[sid] = { username };
  return sid;
}

function getSessionUser(sid) {
  return sessions[sid]?.username;
}

function deleteSession(sid) {
  delete sessions[sid];
}

module.exports = {
  addSession,
  getSessionUser,
  deleteSession,
};
