export function compareWords(word1, word2) {
  word1 = word1.toUpperCase();
  word2 = word2.toUpperCase();

  let count = 0;
  let word2Letters = word2.split('');

  for (let letter of word1) {
    let index = word2Letters.indexOf(letter);
    if (index !== -1) {
      count++;
      word2Letters[index] = ''; 
    }
  }

  return count;
}
