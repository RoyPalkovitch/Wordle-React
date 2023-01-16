import { useState, useEffect, useRef, useContext, MouseEvent, useCallback } from "react";
import { gameConfigContext } from '../context/gameConfigContext';
import { gameConfigType } from "./types/gameConfigType";
import { gameTileType } from "./types/gameTileType";
import { boardType } from "./types/boardType";
import { modalObsType } from "./types/modalObsType";
import { ModalObsContext } from "../context/modalObsContext";

type currentRow = React.MutableRefObject<[gameTileType, React.Dispatch<React.SetStateAction<gameTileType>>][]>;


export function useBoard(): boardType {

  const { lengthOfWord, numberOfTries, propChanged }: gameConfigType = useContext(gameConfigContext) as gameConfigType;
  const { modalObs, setModalObs }: modalObsType = useContext(ModalObsContext) as modalObsType;

  const [showGameEndPopup, setGameEndPopup] = useState(false);
  const [resetGame, setResetGame] = useState(false);
  const boardRef = useRef<React.MutableRefObject<[gameTileType, React.Dispatch<React.SetStateAction<gameTileType>>][]>[]>([]);
  const currentRow = useRef(0);
  const currentCol = useRef(0);
  const keyBoardGrid = useRef<gameTileType[][]>([[{
    letter: '',
    classState: 'keyboard-tile '
  }]]);
  const winOrLose = useRef('');
  const currentWord = useRef('');
  const waitingResponse = useRef(false);
  const rendered = useRef(false);
  const letters: string = "qwertyuiopasdfghjklzxcvbnm";
  const endPoint: string = 'http://localhost:3003';
  //create game board according user confing
  const createBoard = useCallback(() => {
    boardRef.current.forEach((row, i) => {
      row.current.forEach((cell, j) => {
        cell[0].letter = '';
        cell[0].classState = 'col game-tile'
        if (i === 0 && j === 0) {
          cell[0].classState += ' focus'
        }
        cell[1]({ ...cell[0] });
      })
    })

  }, [])

  //create on screen keyboard
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

  const shouldMoveRow = useCallback(async (currentFocusedRow: currentRow) => {
    const win = await searchCorrectWords(currentFocusedRow);
    console.log("Done");
    currentRow.current++;
    currentCol.current = 0;
    if (win || currentRow.current === numberOfTries.current!) {
      winOrLose.current = win ? "Win" : "Lose";
      setGameEndPopup(true);
      setModalObs(true);
      return
    }
  }, [numberOfTries, setModalObs]);

  const addFocus = () => {
    const currentCell = boardRef.current[currentRow.current].current[currentCol.current];
    if (!currentCell[0].classState.includes('focus')) {
      currentCell[0].classState += ' focus';
      currentCell[1]({ ...currentCell[0] });
    }
  }

  const removeFocus = () => {
    const currentCell = boardRef.current[currentRow.current].current[currentCol.current];
    currentCell[0].classState = currentCell[0].classState.replace('focus', '');
    currentCell[1]({ ...currentCell[0] });
  }

  const write = useCallback(async (letter: string, currentFocusedRow: currentRow) => {
    const cell = currentFocusedRow.current[currentCol.current];
    if (!cell[0].letter) {
      cell[0].letter = letter.toUpperCase();
      removeFocus();
      currentCol.current++;
      if (currentCol.current > lengthOfWord.current! - 1) {
        await shouldMoveRow(currentFocusedRow);
      }
      return;
    }
    if (cell[0].letter) {
      currentCol.current++;
      cell[0].letter = letter.toUpperCase();
      removeFocus();
      if (currentCol.current === lengthOfWord.current! - 1) {
        await shouldMoveRow(currentFocusedRow);
      }
      return;
    }
  }, [shouldMoveRow, lengthOfWord]);

  const deleteWord = useCallback((currentFocusedRow: currentRow) => {
    const cell = currentFocusedRow.current[currentCol.current];
    cell[0].letter = '';
    if (currentCol.current > 0) {
      removeFocus();
      currentCol.current--;
      return;
    }
    cell[1]({ ...cell[0] });
  }, []);

  //handling keydown on document
  const handleKeyDown = useCallback(async (e: KeyboardEvent | MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // return if request have'nt finished
    if (waitingResponse.current) {
      return;
    }
    waitingResponse.current = true;

    const letter: string = (e as KeyboardEvent).key ? (e as KeyboardEvent).key : (e as MouseEvent<HTMLButtonElement>).currentTarget.value;
    const currentFocusedRow: currentRow = boardRef.current[currentRow.current];

    if (letters.includes(letter.toLowerCase())) {
      await write(letter, currentFocusedRow);
    }
    if (letter === "Backspace") {
      deleteWord(currentFocusedRow);
    }
    waitingResponse.current = false;
    addFocus();
  }, [write, deleteWord])



  const searchCorrectWords = async (currentFocusedRow: currentRow) => {//search for correct words in the row
    const cells = currentFocusedRow.current;

    const dataToSend = {
      currentFocusedRow: Array.from(cells.map(cell => cell[0])),
      currentWord: currentWord.current,
      keyBoardGrid: keyBoardGrid.current
    }
    const getCorrectData = await fetch(`${endPoint}/game/searchcorrectwords`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      }
    );
    const colorDataRow = await getCorrectData.json() as
      { currentFocusedRow: gameTileType[], keyBoardGrid: gameTileType[][], win: boolean };
    colorDataRow.currentFocusedRow.forEach((colorData, i) => {
      const newClass = cells[i][0].classState + colorData.classState
      cells[i][1]({ ...cells[i][0], classState: newClass })
    });
    keyBoardGrid.current = colorDataRow.keyBoardGrid;
    return colorDataRow.win;
  }


  // set/reset the game
  const setGame = useCallback(() => {
    rendered.current = true;
    keyBoardGrid.current = [];
    currentRow.current = 0;
    currentCol.current = 0;
    winOrLose.current = '';
    createKeyboard();
    createBoard();
    setGameEndPopup(false);
    setResetGame(false);
  }, [createBoard])

  useEffect(() => {
    if (!rendered.current || propChanged) {
      //protect against double rendering when not needed
      fetch(`${endPoint}/game`)
        .then(response => response.text())
        .then(response => currentWord.current = response.toUpperCase())
      setGame();
    }
    if (!modalObs) {
      //add event if modal is closed
      document.addEventListener("keydown", handleKeyDown);
      return () =>
        document.removeEventListener('keydown', handleKeyDown);
    }
    //remove event if modal is open
    document.removeEventListener('keydown', handleKeyDown);

  }, [resetGame, propChanged, modalObs, handleKeyDown, setGame]);



  return {
    currentRow,
    currentCol,
    letters,
    keyBoardGrid,
    showGameEndPopup,
    winOrLose,
    rendered,
    setResetGame,
    handleKeyDown,
    boardRef
  }

}

