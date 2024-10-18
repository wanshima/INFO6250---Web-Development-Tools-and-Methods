const express = require('express');
const cookieParser = require('cookie-parser');

const sessionsManager = require('./models/sessions'); 
const gameManager = require('./models/game'); 
const gameWeb = require('./views/game-web'); 
const loginWeb = require('./views/login-web'); 

const app = express();
const PORT = 3000;
const GREETING = "Welcome! Let's guess the secret word.";

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));

app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    const username = sessionsManager.getUsername(sid);

    if (username) {
        let currentGame = gameManager.getGame(username);

        if (!currentGame) { 
            gameManager.createGame(username); 
            currentGame = gameManager.getGame(username);
        }

        const playResult = currentGame.turnResult || GREETING;
        res.send(gameWeb.gamePage(gameManager, username, playResult)); 
    } else {
        const message = sid ? 'Your session has expired or is invalid. Please log in again.' : '';
        res.status(401).send(loginWeb.loginPage(message));
    }
});

app.post('/login', (req, res) => {
    const username = req.body.username.trim(); 

    if (!username || !/^[a-zA-Z0-9]+$/.test(username)) {
        const errorMessage = 'Invalid username. Only letters and numbers are allowed.';
        res.status(400).send(loginWeb.loginPage(errorMessage));
        return;
    }

    if (username.toLowerCase() === 'dog') {
        const errorMessage = 'Access denied for "dog".';
        res.status(403).send(loginWeb.loginPage(errorMessage));
        return;
    }

    const sid = sessionsManager.createSession(username);
    res.cookie('sid', sid, { maxAge: sessionsManager.MAX_AGE });
    res.redirect('/');
});

app.post('/guess', (req, res) => {
    const sid = req.cookies.sid;
    const username = sessionsManager.getUsername(sid);

    if (!username) {
        res.status(401).send(loginWeb.loginPage('Your session has expired or is invalid. Please log in again.'));
        return;
    }

    let currentGame = gameManager.getGame(username);
    if (!currentGame) {
        gameManager.createGame(username);
        currentGame = gameManager.getGame(username);
    }

    const rawGuess = req.body.word || '';
    const guess = rawGuess.trim().toLowerCase();

    gameManager.playGame(username, guess);
    
    res.redirect('/');
});

app.post('/new-game', (req, res) => {
    const sid = req.cookies.sid;
    const username = sessionsManager.getUsername(sid);

    if (!username) {
        res.status(401).redirect('/');
        return;
    }

    gameManager.deleteGame(username);
    res.redirect('/');
});

app.post('/logout', (req, res) => {
    const sid = req.cookies.sid;

    sessionsManager.deleteSession(sid);
    res.clearCookie('sid');
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
