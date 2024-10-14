const express = require('express');
const cookieParser = require('cookie-parser');
const sessionStore = require('./models/session');  
const web = require('./models/session-web'); 

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));  


app.get('/', (req, res) => {
  const sid = req.cookies.sid;
  if (sid && sessionStore.getSession(sid)) {
    const { username } = sessionStore.getSession(sid);
    const profileData = sessionStore.getUserProfile(username);
    res.send(web.dataPage(username, profileData.storedWord));
  } else {
    res.send(web.loginPage());
  }
});


app.post('/session', (req, res) => {
  const username = req.body.username.trim();
  
  if (!username.match(/^[a-zA-Z0-9]+$/)) {
    res.status(400).send(web.errorPage('Invalid Username'));
    return;
  } else if (username === 'dog') {
    res.status(403).send(web.errorPage('User account not permitted'));
    return;
  }

  const sid = crypto.randomUUID();
  sessionStore.createSession(sid, username);
  res.cookie('sid', sid);
  res.redirect('/');
});


app.post('/updateWord', (req, res) => {
  const sid = req.cookies.sid;

  if (!sid || !sessionStore.getSession(sid)) {
    res.status(401).send(web.errorPage('Invalid session'));
    return;
  }

  const { username } = sessionStore.getSession(sid);
  const newWord = req.body.storedWord || '';
  sessionStore.updateStoredWord(username, newWord);
  res.redirect('/');
});


app.post('/logout', (req, res) => {
  const sid = req.cookies.sid;

  if (sid) {
    sessionStore.deleteSession(sid);
    res.clearCookie('sid');
  }

  res.redirect('/');
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
