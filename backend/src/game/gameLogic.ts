
export type gameTileType = {
  classState: string,
  letter: string
}

export const getWord = (): Promise<string> => {
  return new Promise<string>(resolve => setTimeout(resolve, 1000, 'event'));
}


export const searchCorrectWords =
  (currentFocusedRow: gameTileType[], currentWord: string, keyBoardGrid: gameTileType[][]): { currentFocusedRow: gameTileType[], keyBoardGrid: gameTileType[][] } | boolean => {//search for correct words in the row
    const charCount: { [word: string]: number } = countCharsInWord(currentWord);
    const letters: string = "qwertyuiopasdfghjklzxcvbnm".toUpperCase();

    for (let index = 0; index < currentFocusedRow.length; index++) {//checking each column in row
      const letter = currentFocusedRow[index].letter;
      if (!letters.includes(letter)) {
        return false;
      }
      const keyboard = getKeyboardTile(letter, keyBoardGrid);
      if (!keyboard) {
        continue;
      }
      //letter is not in the word
      if (!currentWord.includes(letter) || charCount[letter] === 0) {
        currentFocusedRow[index].classState = 'wrong';
        if (keyboard.classState === 'keyboard-tile ') {
          keyboard.classState += 'wrong';
        }
        continue;
      }
      //mark keyboard if letter exist but not in the current place (the row will be colored in the next for loop)
      if (currentWord[index] !== letter) {
        if (!keyboard.classState.includes('correct'))
          keyboard.classState = 'keyboard-tile exist';
        currentFocusedRow[index].classState = 'exist';//exist in the given word
        continue;
      }

      //if letter exist
      if (currentWord[index] === letter) {
        charCount[letter] -= 1;
        currentFocusedRow[index].classState = 'correct';
        if (charCount[letter] === 0) {
          keyboard.classState = 'keyboard-tile correct';
        }
        if (charCount[letter] !== 0 && keyboard.classState === 'keyboard-tile ') {
          keyboard.classState = 'keyboard-tile exist';
        }
        continue;
      }
    }

    return { currentFocusedRow, keyBoardGrid };
  }

const countCharsInWord = (currentWord: string): { [word: string]: number } => {
  const count: { [word: string]: number } = {};
  for (let i = 0; i < currentWord.length; i++) {
    if (count[currentWord[i]])
      count[currentWord[i]] += 1;
    else {
      count[currentWord[i]] = 1;
    }
  }
  return count;
}

const getKeyboardTile = (letter: string, keyBoardGrid: gameTileType[][]): gameTileType => {
  for (let i = 0; i < keyBoardGrid.length; i++) {
    for (let j = 0; j < keyBoardGrid[i].length; j++) {
      if (letter === keyBoardGrid[i][j].letter) {

        return keyBoardGrid[i][j];
      }
    }
  }
  return { classState: '', letter: "" }
}