import { useState, useEffect, useRef, useContext, MouseEvent } from "react";
import { gameConfigContext } from '../context/gameConfigContext';
import { gameConfigType } from "./useGameConfig";

export type gameTileType = {
  classState: string,
  letter: string
}

export type boardType = {
  board: gameTileType[][],
  letters: string,
  showGameEndPopup: boolean,
  currentRow: React.MutableRefObject<number>,
  currentCol: React.MutableRefObject<number>,
  keyBoardGrid: React.MutableRefObject<gameTileType[][]>,
  winOrLose: React.MutableRefObject<string>,
  setResetGame: React.Dispatch<React.SetStateAction<boolean>>,
  handleKeyDown: (e: KeyboardEvent | MouseEvent<HTMLButtonElement>) => void
}



export function useBoard(): boardType {

  const { lengthOfWord, numberOfTries, propChanged }: gameConfigType = useContext(gameConfigContext) as gameConfigType;


  const [board, setBoard] = useState<gameTileType[][]>([[{ classState: '', letter: '' }]]);
  const [showGameEndPopup, setGameEndPopup] = useState<boolean>(false);
  const [resetGame, setResetGame] = useState<boolean>(false);

  const currentRow = useRef<number>(0);
  const currentCol = useRef<number>(0);
  const keyBoardGrid = useRef<gameTileType[][]>([[{
    letter: '',
    classState: 'keyboard-tile '
  }]]);
  const winOrLose = useRef<string>("");

  const currentWord = useRef('');
  const letters: string = "qwertyuiopasdfghjklzxcvbnm";
  const charCount = useRef<{ [word: string]: number }>({ '': 0 });

  useEffect(() => {

  }, [])

  useEffect(() => {
    const fetchWord = async () => {
      currentWord.current = (await (await getWord()).text()).toUpperCase();
      setGame();
    }
    fetchWord();

    document.addEventListener("keydown", handleKeyDown);
    return () =>
      document.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line 
  }, [resetGame, propChanged]);

  const getWord = async () => {
    const request = await fetch('http://localhost:3003/game');

    return request;
  }

  const setGame = () => {
    board.splice(0);
    keyBoardGrid.current = [];
    currentRow.current = 0;
    currentCol.current = 0;
    winOrLose.current = '';
    charCount.current = countCharsInWord(currentWord.current);
    createKeyboard();
    createBoard();
    setBoard([...board]);
    setGameEndPopup(false);
    setResetGame(false);
  }

  const createBoard = () => {
    if (board.length === numberOfTries.current) {
      return;
    }
    let numOfTries: number;
    let length: number;
    if (numberOfTries.current === null) {
      numOfTries = 5;
    } else {
      numOfTries = numberOfTries.current;
    }

    if (lengthOfWord.current === null) {
      length = 5;
    } else {
      length = lengthOfWord.current;
    }


    for (let i = 0; i < numOfTries; i++) {
      board.push([]);
      for (let j = 0; j < length; j++) {
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

    const letter: string = (e as KeyboardEvent).key ? (e as KeyboardEvent).key : (e as MouseEvent<HTMLButtonElement>).currentTarget.value;
    const currentFocusedRow: gameTileType[] = board[currentRow.current];
    if (letters.includes(letter)) {
      write(letter, currentFocusedRow);
    }
    if (letter === "Backspace") {
      deleteWord(currentFocusedRow);
    }
    setBoard([...board]);


  }

  const shouldMoveRow = (currentFocusedRow: gameTileType[],) => {
    searchCorrectWords(currentFocusedRow);
    console.log("Done");
    currentRow.current++;
    currentCol.current = 0;
    charCount.current = countCharsInWord(currentWord.current);
    if (checkWin(currentFocusedRow)) {
      winOrLose.current = 'Win';
      setGameEndPopup(true);
      document.removeEventListener('keydown', handleKeyDown);
      return
    }
    if (currentRow.current === 5) {
      winOrLose.current = 'Lose';
      setGameEndPopup(true);
      document.removeEventListener('keydown', handleKeyDown);
      return
    }

  }

  const deleteWord = (currentFocusedRow: gameTileType[]) => {
    currentFocusedRow[currentCol.current].letter = '';
    if (currentCol.current) {
      currentCol.current--;
    }
  }

  const write = (letter: string, currentFocusedRow: gameTileType[]) => {

    if (currentFocusedRow[currentCol.current].letter && currentFocusedRow[currentCol.current + 1] !== undefined) {
      currentCol.current++;
      currentFocusedRow[currentCol.current].letter = letter.toUpperCase();
    } else if (currentFocusedRow[currentCol.current + 1]) {
      currentFocusedRow[currentCol.current].letter = letter.toUpperCase();
      currentCol.current++;

    } else {
      currentFocusedRow[currentCol.current].letter = letter.toUpperCase();
      shouldMoveRow(currentFocusedRow);
    }
  }

  const searchCorrectWords = (currentFocusedRow: gameTileType[]) => {//search for correct words in the row

    for (let index = 0; index < currentFocusedRow.length; index++) {//checking each column in row
      const letter = currentFocusedRow[index].letter;
      const keyboard = getKeyboardTile(letter);
      if (!keyboard) {
        return;
      }

      if (currentWord.current.includes(letter)) {
        if (currentWord.current[index] === letter) {
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
      if (currentWord.current.includes(letter) && currentWord.current[index] !== letter) {
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
    if (win === currentWord.current) {
      return true;
    }
    return false;
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

  const getKeyboardTile = (letter: string): gameTileType => {
    for (let i = 0; i < keyBoardGrid.current.length; i++) {
      for (let j = 0; j < keyBoardGrid.current[i].length; j++) {
        if (letter === keyBoardGrid.current[i][j].letter) {

          return keyBoardGrid.current[i][j];
        }
      }
    }
    return { classState: '', letter: "" }
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

