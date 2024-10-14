"use strict";

const sessions = {}; 
const profiles = {};

function getSession(sid) {
  return sessions[sid];
}

function createSession(sid, username) {
  sessions[sid] = { username };
  if (!profiles[username]) {
    profiles[username] = { storedWord: '' }; 
  }
}

function deleteSession(sid) {
  delete sessions[sid];
}

function getUserProfile(username) {
  return profiles[username] || { storedWord: '' };
}

function updateStoredWord(username, newWord) {
  if (profiles[username]) {
    profiles[username].storedWord = newWord;
  }
}

module.exports = {
  getSession,
  createSession,
  deleteSession,
  getUserProfile,
  updateStoredWord
};
