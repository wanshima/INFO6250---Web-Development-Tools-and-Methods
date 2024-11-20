import express from 'express';
import cookieParser from 'cookie-parser';
import sessions from './sessions.js';
import users from './users.js';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

app.get('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

app.post('/api/v1/session', (req, res) => {
  const { username } = req.body;

  if (!username) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if (!users.isValidUsername(username)) {
    res.status(400).json({ error: 'invalid-username' });
    return;
  }

  if (username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);
  if (!users.hasUser(username)) {
    users.addUser(username);
  }

  res.cookie('sid', sid);
  res.json({ username });
});

app.delete('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  if (sid) {
    sessions.deleteSession(sid);
    res.clearCookie('sid');
  }
  res.json({ message: 'Logged out' });
});

app.get('/api/v1/word', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const word = users.getUserWord(username);
  res.json({ word });
});

app.put('/api/v1/word', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { word } = req.body;

  if (!word) {
    res.status(400).json({ error: 'required-word' });
    return;
  }

  if (!users.isValidWord(word)) {
    res.status(400).json({ error: 'invalid-word' });
    return;
  }

  users.setUserWord(username, word);
  res.json({ word });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
