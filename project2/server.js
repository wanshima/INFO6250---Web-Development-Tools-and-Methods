const express = require('express');
const cookieParser = require('cookie-parser');

const sessions = require('./sessions');
const users = require('./users');
const messages = require('./messages');

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

function sessionMiddleware(req, res, next) {
  const sid = req.cookies.sid;
  const username = sessions.getSessionUser(sid);

  if (!sid || !username || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  req.username = username;
  next();
}

app.get('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sessions.getSessionUser(sid);
  
  if (!sid || !username || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

    const latestMessageId = messages.getLatestMessageId();
    res.json({ username, latestMessageId });
});

app.post('/api/v1/session', (req, res) => {
  const { username } = req.body;

  if (!users.isValid(username)) {
    res.status(400).json({ error: 'invalid-username' });
    return;
  }

  if (!users.isPermitted(username)) {
    res.status(403).json({ error: 'forbidden-username' });
    return;
  }

  const sid = sessions.addSession(username);
  users.addActiveUser(username);

  res.cookie('sid', sid, { httpOnly: true }); 
  res.json({ message: 'Login successful' });
});

app.delete('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sessions.getSessionUser(sid);

  if (sid) {
    res.clearCookie('sid');
  }

  if (username) {
    sessions.deleteSession(sid);
    users.removeActiveUser(username);
  }

  res.json({ message: 'Logout successful' });
});


app.get('/api/v1/messages', sessionMiddleware, (req, res) => {
  const lastMessageId = parseInt(req.query.lastMessageId, 10) || 0;
  const newMessages = messages.getMessagesAfterId(lastMessageId);
  res.json(newMessages);
});

app.post('/api/v1/messages', sessionMiddleware, (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    res.status(400).json({ error: 'empty-message' });
    return;
  }

  messages.addMessage(req.username, text);
  res.json({ message: 'Message sent' });
});

app.get('/api/v1/users', sessionMiddleware, (req, res) => {
  res.json(users.getActiveUsers());
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
