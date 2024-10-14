"use strict";

function loginPage() {
    return `
      <html>
      <head><title>Login</title><link rel="stylesheet" href="/styles.css"></head>
      <body class="page-body">
        <h1 class="page-title">Login</h1>
        <form class="form" action="/session" method="POST">
          <label class="label" for="username">Username:</label>
          <input class="input" type="text" id="username" name="username">
          <button class="button" type="submit">Login</button>
        </form>
      </body>
      </html>
    `;
  }
  

function dataPage(username, storedWord) {
    return `
      <html>
      <head><title>Data Page</title><link rel="stylesheet" href="/styles.css"></head>
      <body class="page-body">
        <h1 class="page-title">Welcome, ${username}</h1>
        <p class="stored-word">Your stored word: <strong>${storedWord || ''}</strong></p>
        <form class="form" action="/updateWord" method="POST">
          <label class="label" for="storedWord">Change stored word:</label>
          <input class="input" type="text" id="storedWord" name="storedWord" value="${storedWord || ''}">
          <button class="button" type="submit">Update</button>
        </form>
        <form class="form" action="/logout" method="POST">
          <button class="button" type="submit">Logout</button>
        </form>
      </body>
      </html>
    `;
  }
  

function errorPage(message) {
    return `
      <html>
      <head><title>Error</title></head>
      <body class="page-body">
        <h1 class="page-title">Error: ${message}</h1>
        <a class="link" href="/">Try again</a>
      </body>
      </html>
    `;
  }
  
module.exports = {
    loginPage,
    dataPage,
    errorPage,
  };
  