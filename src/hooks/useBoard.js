import { useState, useEffect, useRef } from "react";

export function useBoard() {
  const [board, setBoard] = useState([]);
  const currentRow = useRef(0);
  const currentCol = useRef(0);
  const keyBoardGrid = useRef([]);
  const currentWord = "event".toUpperCase();
  const letters = "qwertyuiopasdfghjklzxcvbnm";
  const charCount = countChar(currentWord);


  function countChar(currentWord) {
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
    if (keyBoardGrid.current.length === 3) {
      return;
    }
    let letterCount = 0;
    for (let currentKeysRow = 0; currentKeysRow < 3; currentKeysRow++) {
      keyBoardGrid.current.push([]);
      for (let currentKeyPos = 0; currentKeyPos < 10; currentKeyPos++) {
        keyBoardGrid.current[currentKeysRow].push({
          letter: '',
          className: 'keyboard-tile '
        });
        if (currentKeysRow === 2 && (currentKeyPos === 0 || currentKeyPos === 8)) {
          keyBoardGrid.current[currentKeysRow].className += ' keyboard-tile-large ';
          keyBoardGrid.current[currentKeysRow].letter = currentKeyPos === 8 ? 'Backspace' : 'Enter'
          continue;
        }
        if (letterCount < 26) {
          keyBoardGrid.current[currentKeysRow].letter = letters[letterCount].toUpperCase();
          letterCount++;
          continue;

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
    if (currentFocusedRow[currentCol.current + 1] === undefined && (letter === "Enter")) {
      if (currentFocusedRow[currentCol.current]) {
        searchCorrectWords(currentFocusedRow);
        currentRow.current++;
        currentCol.current = 0;
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
    setBoard([...board]);
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

    //let keyboard;
    for (let index = 0; index < currentFocusedRow.length; index++) {//checking each column in row
      const val = currentFocusedRow[index].letter;
      //keyboard = document.getElementById(val);
      if (currentWord.includes(val)) {
        if (currentWord[index] === val) {
          currentFocusedRow[index].correct = 'correct';//correct place
          //keyboard.classList.add('correct');
          charCount[val] -= 1;
          // if (charCount[val] !== 0) {
          //   keyboard.classList.remove('correct');
          //   keyboard.classList.add('exist');
          // }
        }
        //  else {
        //   if (!keyboard.className.includes('correct')) {
        //     keyboard.classList.add('exist');
        //   }
        // }
      } else {
        currentFocusedRow[index].correct = 'wrong';
        //keyboard.classList.add('wrong');
      }
    }
    //tried = countChar(currentWord) tried[val] > 0 && ;
    for (let index = 0; index < currentFocusedRow.length; index++) {//checking each column in row
      const val = currentFocusedRow[index].letter;
      if (currentWord.includes(val) && currentWord[index] !== val) {
        if (!currentFocusedRow[index].correct !== 'correct' && charCount[val] >= 1) {
          currentFocusedRow[index].correct = 'exist';//exist in the given word
          charCount[val] -= 1;
        }
        else {
          currentFocusedRow[index].correct = 'exist';
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


  return {
    board,
    currentRow,
    currentCol,
    letters,
    setBoard,
    keyBoardGrid,
    handleKeyDown
  }

}

