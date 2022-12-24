import { useState, useEffect, useRef, MouseEvent } from "react";

export type gameTileType = {
  classState: string,
  letter: string
}

export type boardType = {
  board: {
    classState: string;
    letter: string;
  }[][],
  currentRow: React.MutableRefObject<number>,
  currentCol: React.MutableRefObject<number>,
  letters: string,
  keyBoardGrid: React.MutableRefObject<{
    letter: string;
    classState: string;
  }[][]>,
  showGameEndPopup: boolean,
  winOrLose: React.MutableRefObject<string>,
  setResetGame: React.Dispatch<React.SetStateAction<boolean>>,
  handleKeyDown: (e: KeyboardEvent | MouseEvent<HTMLButtonElement>) => void
}

export function useBoard(): boardType {
  const [board, setBoard] = useState([[{ classState: '', letter: '' }]]);
  const [showGameEndPopup, setGameEndPopup] = useState(false);
  const [resetGame, setResetGame] = useState(false);

  const currentRow = useRef(0);
  const currentCol = useRef(0);
  const keyBoardGrid = useRef([[{
    letter: '',
    classState: 'keyboard-tile '
  }]]);
  const winOrLose = useRef("");

  const currentWord = "event".toUpperCase();
  const letters = "qwertyuiopasdfghjklzxcvbnm";
  const charCount = useRef(countCharsInWord(currentWord));

  useEffect(() => {

    setGame()
    document.addEventListener("keydown", handleKeyDown);
    return () =>
      document.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line 
  }, [resetGame]);


  const createBoard = () => {
    if (board.length === 5) {
      return;
    }
    for (let i = 0; i < 5; i++) {
      board.push([]);
      for (let j = 0; j < 5; j++) {
        board[i].push({ classState: '', letter: '' });
      }
    }

  }

  const createKeyboard = () => {
    let letterCount = 0;
    if (keyBoardGrid.current.length === 3) {
      return;
    }
    for (let currentKeysRow = 0; currentKeysRow < 3; currentKeysRow++) {
      keyBoardGrid.current.push([]);
      for (let currentKeyPos = 0; currentKeyPos < 10; currentKeyPos++) {
        if (currentKeysRow === 1 && currentKeyPos === 9) {
          continue;
        }
        keyBoardGrid.current[currentKeysRow].push({
          letter: '',
          classState: 'keyboard-tile '
        });
        if (currentKeysRow === 2 && (currentKeyPos === 0 || currentKeyPos === 7)) {
          keyBoardGrid.current[currentKeysRow][currentKeyPos].classState += ' keyboard-tile-large ';
          keyBoardGrid.current[currentKeysRow][currentKeyPos].letter = currentKeyPos === 7 ? 'Backspace' : 'Enter';
          if (currentKeyPos === 7) {
            break;
          }
        } else {
          if (letterCount < 26) {
            keyBoardGrid.current[currentKeysRow][currentKeyPos].letter = letters[letterCount].toUpperCase();
            letterCount++;
          }
        }

      }
    }

  }
  const handleKeyDown = (e: KeyboardEvent | MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentRow.current === board.length) {
      return;
    }
    const letter: string = (e as KeyboardEvent).key ? (e as KeyboardEvent).key : (e as MouseEvent<HTMLButtonElement>).currentTarget.value;
    const currentFocusedRow: gameTileType[] = board[currentRow.current];
    if (currentFocusedRow.length - 1 === currentCol.current && letter === "Enter") {
      if (currentFocusedRow[currentCol.current]) {
        searchCorrectWords(currentFocusedRow);
        currentRow.current++;
        currentCol.current = 0;
        charCount.current = countCharsInWord(currentWord);
        if (checkWin(currentFocusedRow)) {
          winOrLose.current = 'Win';
          setGameEndPopup(true);
          return
        }
      }
    } else {
      if (letter === "Backspace") {
        deleteWord(currentFocusedRow);
      } else {
        write(letter, currentFocusedRow);

      }
    }
    if (currentCol.current === 4) {
      console.log("Done");
    }
    setBoard([...board]);


  }

  const deleteWord = (currentFocusedRow: gameTileType[]) => {
    currentFocusedRow[currentCol.current].letter = '';
    if (currentCol.current) {
      currentCol.current--;
    }
  }

  const write = (letter: string, currentFocusedRow: gameTileType[]) => {
    if (!letters.includes(letter.toLowerCase())) {
      return;
    }
    if (currentFocusedRow[currentCol.current].letter && currentFocusedRow[currentCol.current + 1] !== undefined) {
      currentCol.current++;
      currentFocusedRow[currentCol.current].letter = letter.toUpperCase();
    } else if (currentFocusedRow[currentCol.current + 1]) {
      currentFocusedRow[currentCol.current].letter = letter.toUpperCase();
      currentCol.current++;

    } else {
      currentFocusedRow[currentCol.current].letter = letter.toUpperCase();
    }
  }

  const searchCorrectWords = (currentFocusedRow: gameTileType[]) => {//search for correct words in the row

    for (let index = 0; index < currentFocusedRow.length; index++) {//checking each column in row
      const letter = currentFocusedRow[index].letter;
      const keyboard = getKeyboardTile(letter);
      if (!keyboard) {
        return;
      }

      if (currentWord.includes(letter)) {
        if (currentWord[index] === letter) {
          charCount.current[letter] -= 1;
          if (charCount.current[letter] === 0) {
            keyboard.classState = 'keyboard-tile correct';
          }
          if (charCount.current[letter] !== 0 && keyboard.classState === 'keyboard-tile ') {
            keyboard.classState += 'exist';
          }
          currentFocusedRow[index].classState = 'correct';//correct place

        }
        else {
          if (keyboard.classState === 'keyboard-tile ') {
            keyboard.classState += 'exist';
          }
        }
      } else {
        currentFocusedRow[index].classState = 'wrong';
        if ((keyboard.classState === 'keyboard-tile ')) {
          keyboard.classState += 'wrong';
        }
      }
    }

    for (let index = 0; index < currentFocusedRow.length; index++) {//checking each column in row
      const letter = currentFocusedRow[index].letter;
      if (currentWord.includes(letter) && currentWord[index] !== letter) {
        if (currentFocusedRow[index].classState !== 'correct' && charCount.current[letter] >= 1) {
          currentFocusedRow[index].classState = 'exist';//exist in the given word
          charCount.current[letter] -= 1;
        }
        else {
          currentFocusedRow[index].classState = 'wrong';
        }
      }
    }

  }

  const checkWin = (currentFocusedRow: gameTileType[]): boolean => {//check if all the word are correct and in order
    const win = currentFocusedRow.map(col => (col.letter)).join('');
    if (win === currentWord) {
      return true;
    }
    return false;
  }

  function countCharsInWord(currentWord: string): { [word: string]: number } {
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

  const getKeyboardTile = (letter: string): gameTileType | void => {
    for (let i = 0; i < keyBoardGrid.current.length; i++) {
      for (let j = 0; j < keyBoardGrid.current[i].length; j++) {
        if (letter === keyBoardGrid.current[i][j].letter) {

          return keyBoardGrid.current[i][j];
        }
      }
    }
  }

  const setGame = () => {
    board.splice(0);
    keyBoardGrid.current = [];
    currentRow.current = 0;
    currentCol.current = 0;
    winOrLose.current = '';
    charCount.current = countCharsInWord(currentWord);
    createKeyboard();
    createBoard();
    setBoard([...board]);
    setGameEndPopup(false);
    setResetGame(false);
  }


  return {
    board,
    currentRow,
    currentCol,
    letters,
    keyBoardGrid,
    showGameEndPopup,
    winOrLose,
    setResetGame,
    handleKeyDown
  }

}

