const words = require('./words');

const games = {}; 
const leaderboard = {}; 

function getRandomWord() {
    const index = Math.floor(Math.random() * words.length);
    return words[index];
}

function createGame(username) {
    if (!games[username]) {
        const secretWord = getRandomWord();
        games[username] = {
            secretWord,
            guesses: [],
            turnResult: '',
            playerWin: false,
        };
        console.log(`New game started for user "${username}". Secret word: "${secretWord}"`);

        if (!leaderboard[username]) {
            leaderboard[username] = { bestScore: null, totalGames: 0, totalGuesses: 0 };
        }
    }
}

function getGame(username) {
    return games[username];
}

function deleteGame(username) {
    delete games[username];
}

function playGame(username, guess) {
    const game = games[username];

    if (!game || game.playerWin) {
        return;
    }

    if (!guess || !words.includes(guess)) {
        game.turnResult = `Your last guess "${guess}" was invalid.`;
        return;
    }

    if (game.guesses.includes(guess)) {
        game.turnResult = `You already guessed "${guess}".`;
        return;
    }

    game.guesses.push(guess);

    if (guess === game.secretWord) {
        game.playerWin = true;
        const guessesCount = game.guesses.length;
        game.turnResult = `Congratulations! You guessed the secret word "${game.secretWord}" in ${guessesCount} guesses.`;

        updateUserStats(username, guessesCount);
    } else {
        const matches = countLetterMatches(guess, game.secretWord);
        game.turnResult = `Your guess "${guess}" has ${matches} matching letters.`;
    }
}

function countLetterMatches(word1, word2) {
    const letters1 = word1.split('');
    const letters2 = word2.split('');
    let matches = 0;
    const letterCount = {};

    letters1.forEach(letter => {
        letterCount[letter] = (letterCount[letter] || 0) + 1;
    });

    letters2.forEach(letter => {
        if (letterCount[letter]) {
            matches++;
            letterCount[letter]--;
        }
    });

    return matches;
}

function updateUserStats(username, guessesCount) {
    const userStats = leaderboard[username];

    if (userStats.bestScore === null || guessesCount < userStats.bestScore) {
        userStats.bestScore = guessesCount;
    }

    userStats.totalGames++;
    userStats.totalGuesses += guessesCount;
}

function getUserAverageScore(username) {
    const userStats = leaderboard[username];
    if (userStats && userStats.totalGames > 0) {
        return (userStats.totalGuesses / userStats.totalGames).toFixed(2);
    }
    return null;
}

function getLeaderboard() {
    return Object.entries(leaderboard)
        .filter(([, stats]) => stats.bestScore !== null) 
        .sort(([, a], [, b]) => a.bestScore - b.bestScore) 
        .map(([username, stats]) => ({
            username,
            bestScore: stats.bestScore,
        }));
}

module.exports = {
    createGame,
    getGame,
    deleteGame,
    playGame,
    countLetterMatches,
    getUserAverageScore,
    getLeaderboard, 
    games, 
};
