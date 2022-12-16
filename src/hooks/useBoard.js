import { useState, useEffect, useRef } from "react";

export function useBoard() {
  const [board, setBoard] = useState([]);
  const currentRow = useRef(0);
  const currentCol = useRef(0);
  const keyBoardGrid = useRef([]);
  const currentWord = "event".toUpperCase();
  const letters = "qwertyuiopasdfghjklzxcvbnm";
  const charCount = useRef(countCharsInWord(currentWord));


  function countCharsInWord(currentWord) {
    const count = {};
    for (let i = 0; i < currentWord.length; i++) {
      if (count[currentWord[i]])
        count[currentWord[i]] += 1;
      else {
        count[currentWord[i]] = 1;
      }
    }
    return count;
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    createBoard();
    createKeyboard();
    setBoard([...board]);
    //eslint-disable-next-line
  }, []);

  const createBoard = () => {
    if (board.length === 5) {
      return;
    }
    for (let i = 0; i < 5; i++) {
      board.push([]);
      for (let j = 0; j < 5; j++) {
        board[i].push({ correct: '', letter: '' });
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
        keyBoardGrid.current[currentKeysRow].push({
          letter: '',
          className: 'keyboard-tile '
        });
        if (currentKeysRow === 2 && (currentKeyPos === 0 || currentKeyPos === 7)) {
          keyBoardGrid.current[currentKeysRow][currentKeyPos].className += ' keyboard-tile-large ';
          keyBoardGrid.current[currentKeysRow][currentKeyPos].letter = currentKeyPos === 7 ? 'Backspace' : 'Enter';
          if (currentKeyPos === 7) {
            break;
          }
          continue;
        } else {
          if (letterCount < 26) {
            keyBoardGrid.current[currentKeysRow][currentKeyPos].letter = letters[letterCount].toUpperCase();
            letterCount++;
            continue;
          }
        }

      }
    }

  }

  const handleKeyDown = (e) => {
    if (currentRow.current === board.length) {
      return;
    }
    const letter = e.key ? e.key : e.target.value;
    const currentFocusedRow = board[currentRow.current];
    if (currentFocusedRow.length - 1 === currentCol.current && letter === "Enter") {
      if (currentFocusedRow[currentCol.current]) {
        searchCorrectWords(currentFocusedRow);
        currentRow.current++;
        currentCol.current = 0;
        charCount.current = countCharsInWord(currentWord);
      }
    }
    else if (letter === "Backspace") {
      deleteWord(currentFocusedRow);
    }
    else {
      write(letter, currentFocusedRow);

    }
    setBoard([...board]);
  }

  const deleteWord = (currentFocusedRow) => {
    currentFocusedRow[currentCol.current].letter = '';
    if (currentCol.current) {
      currentCol.current--;
    }
  }

  const write = (letter, currentFocusedRow) => {
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

  const searchCorrectWords = (currentFocusedRow) => {//search for correct words in the row

    for (let index = 0; index < currentFocusedRow.length; index++) {//checking each column in row
      const letter = currentFocusedRow[index].letter;
      const keyboard = getKeyboardTile(letter)
      if (currentWord.includes(letter)) {
        if (currentWord[index] === letter) {
          if (!keyboard.className.includes('correct')) {
            keyboard.className += 'correct';
          }
          currentFocusedRow[index].correct = 'correct';//correct place

          charCount.current[letter] -= 1;
          if (charCount.current[letter] !== 0) {
            keyboard.className.replace('correct', 'exist');
          }
        }
        else {
          if (!keyboard.className.includes('correct')) {
            keyboard.className += 'exist';
          }
        }
      } else {
        currentFocusedRow[index].correct = 'wrong';
        if (!keyboard.className.includes('wrong')) {
          keyboard.className += 'wrong';
        }
      }
    }

    for (let index = 0; index < currentFocusedRow.length; index++) {//checking each column in row
      const letter = currentFocusedRow[index].letter;
      if (currentWord.includes(letter) && currentWord[index] !== letter) {
        if (!currentFocusedRow[index].correct !== 'correct' && charCount.current[letter] >= 1) {
          currentFocusedRow[index].correct = 'exist';//exist in the given word
          charCount.current[letter] -= 1;
        }
        else {
          currentFocusedRow[index].correct = 'wrong';
        }
      }
    }

    checkWin(currentFocusedRow);

  }

  const checkWin = (currentFocusedRow) => {//check if all the word are correct and in order
    let win = ''
    for (let i = 0; i < currentFocusedRow.length; i++) {
      win += currentFocusedRow[i].letter;
    }
    if (win === currentWord) {
      //showPopup(row, 'You Win!');
      alert("winner");
      return true;
    }
    return false;
  }

  const getKeyboardTile = (letter) => {
    let keyboardTile;
    for (let i = 0; i < keyBoardGrid.current.length; i++) {
      for (let j = 0; j < keyBoardGrid.current[i].length; j++) {
        if (letter === keyBoardGrid.current[i][j].letter) {
          keyboardTile = keyBoardGrid.current[i][j];
          break;
        }
      }
      if (keyboardTile) {
        break;
      }
    }
    return keyboardTile
  }

  return {
    board,
    currentRow,
    currentCol,
    letters,
    keyBoardGrid,
    setBoard,
    handleKeyDown
  }

}

