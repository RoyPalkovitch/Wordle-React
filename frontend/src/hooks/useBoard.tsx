import { useState, useEffect, useRef, useContext, MouseEvent, useCallback } from "react";
import { gameConfigContext } from '../context/gameConfigContext';
import { gameConfigType } from "./types/gameConfigType";
import { gameTileType } from "./types/gameTileType";
import { boardType } from "./types/boardType";
import { modalObsType } from "./types/modalObsType";
import { ModalObsContext } from "../context/modalObsContext";

type currentRow = React.MutableRefObject<React.RefObject<HTMLDivElement>[]>;


export function useBoard(): boardType {
  const { lengthOfWord, numberOfTries, propChanged }: gameConfigType = useContext(gameConfigContext) as gameConfigType;
  const { modalObs, setModalObs }: modalObsType = useContext(ModalObsContext) as modalObsType;

  const [showGameEndPopup, setGameEndPopup] = useState(false);
  const [resetGame, setResetGame] = useState(false);

  const boardRef = useRef<React.MutableRefObject<React.RefObject<HTMLDivElement>[]>[]>([]);
  const keyBoardGrid = useRef<React.MutableRefObject<[gameTileType, React.Dispatch<React.SetStateAction<gameTileType>>][]>[]>([]);;

  const currentRow = useRef(0);
  const currentCol = useRef(0);

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
        cell.current!.innerText = '';
        cell.current!.className = 'col game-tile'
        if (i === 0 && j === 0) {
          cell.current!.className += ' focus'
        }
      })
    })

  }, [])

  //create on screen keyboard
  const createKeyboard = useCallback(() => {
    let letterCount = 0;
    keyBoardGrid.current.forEach((row, i) => {
      row.current.forEach((cell, j) => {
        if (i === 1 && j === 9) {
          return;
        }
        cell[0] = {
          letter: '',
          classState: 'keyboard-tile '
        };
        if (i === 2 && (j === 0 || j === 7)) {
          cell[0].classState += ' keyboard-tile-large ';
          cell[0].letter = j === 7 ? 'Backspace' : 'Enter';
          cell[1]({ ...cell[0] });
          return;
        }
        if (letterCount < 26) {
          cell[0].letter = letters[letterCount].toUpperCase();
          cell[1]({ ...cell[0] });
          letterCount++;
        }
      });
    });

  }, [])

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
    if (!currentCell.current?.className.includes('focus')) {
      currentCell.current!.className += ' focus';
    }
  }

  const removeFocus = () => {
    const currentCell = boardRef.current[currentRow.current].current[currentCol.current];
    currentCell.current!.className = currentCell.current!.className.replace('focus', '');
  }

  const write = useCallback(async (letter: string, currentFocusedRow: currentRow) => {
    const currentCell = currentFocusedRow.current[currentCol.current];
    if (!currentCell.current?.innerText) {
      currentCell.current!.innerText = letter.toUpperCase();
      removeFocus();
      currentCol.current++;
      if (currentCol.current > lengthOfWord.current! - 1) {
        await shouldMoveRow(currentFocusedRow);
      }
      return;
    }
    if (currentCell.current!.innerText) {
      currentCol.current++;
      currentCell.current!.innerText = letter.toUpperCase();
      removeFocus();
      if (currentCol.current === lengthOfWord.current! - 1) {
        await shouldMoveRow(currentFocusedRow);
      }
      return;
    }
  }, [shouldMoveRow, lengthOfWord]);

  const deleteWord = useCallback((currentFocusedRow: currentRow) => {
    const currentCell = currentFocusedRow.current[currentCol.current];
    currentCell.current!.innerText = '';
    if (currentCol.current > 0) {
      removeFocus();
      currentCol.current--;
      return;
    }
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
    const currentRow = currentFocusedRow.current;
    const keyBoard = Array.from(keyBoardGrid.current.map(row => (
      Array.from(row.current.map(keyTile => keyTile[0]))
    )));
    const dataToSend = {
      currentFocusedRow: Array.from(currentRow.map(cell => ({ letter: cell.current?.innerText, classState: cell.current?.className } as gameTileType))),
      currentWord: currentWord.current,
      keyBoardGrid: keyBoard
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
      currentRow[i].current!.className += colorData.classState;
    });

    keyBoardGrid.current.forEach((row, i) => {
      row.current.forEach((keyTile, j) => {
        const newClass = colorDataRow.keyBoardGrid[i][j].classState;
        keyTile[0].classState = newClass;
        keyTile[1]({ ...keyTile[0] });
      })
    });
    return colorDataRow.win;
  }


  // set/reset the game
  const setGame = useCallback(() => {
    rendered.current = true;
    currentRow.current = 0;
    currentCol.current = 0;
    winOrLose.current = '';
    createKeyboard();
    createBoard();
    setGameEndPopup(false);
    setResetGame(false);
  }, [createBoard, createKeyboard])

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
    boardRef,
    setResetGame,
    handleKeyDown,
    createKeyboard
  }

}

