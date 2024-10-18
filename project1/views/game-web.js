const words = require('../models/words');

module.exports = {
    gamePage(gameManager, username, message) {
        const game = gameManager.getGame(username);
        const guesses = game.guesses;
        const guessedWords = guesses
            .map(guess => {
                const matches = gameManager.countLetterMatches(guess, game.secretWord);
                return `<li class="list-item">${guess} - ${matches} matching letters</li>`;
            })
            .join('');

        const possibleWordsList = words.map(word => `<li class="word-list-item">${word}</li>`).join('');

        const averageScore = gameManager.getUserAverageScore(username);
        const leaderboard = gameManager.getLeaderboard();

        const personalBest = leaderboard.find(entry => entry.username === username)?.bestScore || 'N/A';

        return `
        <html>
        <head>
            <title>Word Guessing Game</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body class="body">
            <h1 class="heading-primary">Welcome, ${username}!</h1>

            <div class="personal-stats-box">
                <h2>Your Stats</h2>
                <p><strong>Personal Best (Lowest Guesses):</strong> ${personalBest}</p>
                <p><strong>Average Guesses per Game:</strong> ${averageScore || 'N/A'}</p>
            </div>

            <div class="leaderboard-box">
                <h2>Leaderboard (Lowest Guesses)</h2>
                <ul class="leaderboard-list">
                    ${leaderboard.map(entry => `<li><strong>${entry.username}</strong> - Best: ${entry.bestScore} guesses</li>`).join('')}
                </ul>
            </div>

            <div class="game-container">
                <div class="possible-words">
                    <h2 class="heading-secondary">Possible Words</h2>
                    <ul class="word-list">${possibleWordsList}</ul>
                </div>
                <div class="game-status">
                    ${message ? `<p class="message">${message}</p>` : ''}
                    <h2 class="heading-secondary">Your Guesses (${guesses.length})</h2>
                    <ul class="list">${guessedWords}</ul>
                    ${game.playerWin ? `
                        <p>You won! The secret word was "${game.secretWord}".</p>
                    ` : ''}
                    ${!game.playerWin ? `
                        <form method="POST" action="/guess" class="form">
                            <input type="text" name="word" required class="input-text" />
                            <button type="submit" class="button">Submit Guess</button>
                        </form>
                    ` : ''}
                    <form method="POST" action="/new-game" class="form">
                        <button type="submit" class="button">Start a New Game</button>
                    </form>
                    <form method="POST" action="/logout" class="form">
                        <button type="submit" class="button">Logout</button>
                    </form>
                </div>
            </div>
        </body>
        </html>
        `;
    }
};
