import { useState } from 'react';

function StoredWord({ storedWord, onUpdateWord, onClearError }) {
  const [newWord, setNewWord] = useState('');

  function onChange(e) {
    setNewWord(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (newWord) {
      onUpdateWord(newWord);
      setNewWord('');
    }
  }

  return (
    <div className="stored-word">
      <p>Your stored word: {storedWord}</p>
      <form className="stored-word-form" onSubmit={onSubmit}>
        <label>
          <span>New word:</span>
          <input className="input" value={newWord} onChange={onChange} />
        </label>
        <button type="submit" className="button">Update Word</button>
      </form>
    </div>
  );
}

export default StoredWord;
