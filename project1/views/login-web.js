module.exports = {
    loginPage(message) {
        return `
        <html>
        <head>
            <title>Login</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body class="body">
            <h1 class="heading-primary">Login</h1>
            ${message ? `<p class="error-message">${message}</p>` : ''}
            <form method="POST" action="/login" class="form">
                <label for="username">Username:</label>
                <input type="text" name="username" required class="input-text" />
                <button type="submit" class="button">Login</button>
            </form>
        </body>
        </html>
        `;
    },
};
