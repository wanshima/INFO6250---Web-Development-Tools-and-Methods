import { useState } from 'react';
import { compareWords } from './compare.js';

function Game({ username, onLogout }) {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const secretWord = 'RECAT';

  function handleSubmit(e) {
    e.preventDefault();
    const input = guess.trim();
    const uppercaseInput = input.toUpperCase();
    setGuess('');
  
    if (input === '') {
      setMessage('Word cannot be empty');
      return;
    }
  
    if (input.length !== 5 || !/^[A-Za-z]{5}$/.test(input)) {
      setMessage(`${input} was not a valid word`);
      return;
    }
  
    if (uppercaseInput === secretWord) {
      setMessage(`${input} is the secret word!`);
    } else {
      const lettersInCommon = compareWords(uppercaseInput, secretWord);
      setMessage(`${input} had ${lettersInCommon} letters in common`);
    }
  }

  return (
    <div className="game">
      <p>Hello {username}!</p>
      <button onClick={onLogout} className="button">Logout</button>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          <span>Enter a 5-letter word:</span>
          <input
            type="text"
            className="input"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            maxLength={5}
          />
        </label>
        <button type="submit" className="button">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Game;
