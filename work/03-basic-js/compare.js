"use strict";

module.exports = compare;

function compare( word, guess ) {

  word = word.toLowerCase();
  guess = guess.toLowerCase();

  const wordLetterCount = {};

  for (const letter of word) {
    if (!wordLetterCount[letter]) {
      wordLetterCount[letter] = 0;
    }
    wordLetterCount[letter]++;
  }

  let commonCount = 0;

  for (const letter of guess) {
    if (wordLetterCount[letter] && wordLetterCount[letter] > 0) {
      commonCount++;
      wordLetterCount[letter]--;
    }
  }

  return commonCount;
}
