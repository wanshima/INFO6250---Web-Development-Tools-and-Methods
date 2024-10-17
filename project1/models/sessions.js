const crypto = require('crypto');

const sessions = {}; 
const MAX_AGE = 1000 * 60 * 60; 

function createSession(username) {
    const sid = crypto.randomUUID();
    sessions[sid] = { username }; 
    return sid;
}

function getUsername(sid) {
    const session = sessions[sid];
    return session ? session.username : null;
}

function setErrorMessage(sid, message) {
    if (sessions[sid]) {
        sessions[sid].errorMessage = message;
    }
}

function getErrorMessage(sid) {
    const session = sessions[sid];
    return session ? session.errorMessage : '';
}

function clearErrorMessage(sid) {
    if (sessions[sid]) {
        sessions[sid].errorMessage = '';
    }
}

function deleteSession(sid) {
    delete sessions[sid];
}

module.exports = {
    createSession,
    getUsername,
    setErrorMessage,
    getErrorMessage,
    clearErrorMessage,
    deleteSession,
    MAX_AGE,
};
