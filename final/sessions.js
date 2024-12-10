import { randomUUID } from 'crypto';

const sessions = {};

function addSession(username) {
  const sid = randomUUID();
  sessions[sid] = { username };
  return sid;
}

function getSessionUser(sid) {
  return sessions[sid]?.username;
}

function deleteSession(sid) {
  delete sessions[sid];
}

export default {
  addSession,
  getSessionUser,
  deleteSession,
};
