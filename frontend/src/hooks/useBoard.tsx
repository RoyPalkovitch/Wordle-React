import { useState, useEffect, useRef, useContext, MouseEvent } from "react";
import { gameConfigContext } from '../context/gameConfigContext';
import { gameConfigType } from "./types/gameConfigType";
import { gameTileType } from "./types/gameTileType";
import { boardType } from "./types/boardType";
import { modalObsType } from "./types/modalObsType";
import { ModalObsContext } from "../context/modalObsContext";
export function useBoard(): boardType {

  const { lengthOfWord, numberOfTries, propChanged }: gameConfigType = useContext(gameConfigContext) as gameConfigType;
  const { modalObs }: modalObsType = useContext(ModalObsContext) as modalObsType;

  const [board, setBoard] = useState<gameTileType[][]>([[{ classState: '', letter: '' }]]);
  const [showGameEndPopup, setGameEndPopup] = useState(false);
  const [resetGame, setResetGame] = useState(false);

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

    // eslint-disable-next-line 
  }, [resetGame, propChanged, modalObs]);


  // set/reset the game
  const setGame = () => {
    rendered.current = true;
    board.splice(0);
    keyBoardGrid.current = [];
    currentRow.current = 0;
    currentCol.current = 0;
    winOrLose.current = '';
    createKeyboard();
    createBoard();
    setGameEndPopup(false);
    setResetGame(false);
    setBoard([...board]);
  }

  //create game board according user confing
  const createBoard = () => {
    if (board.length === numberOfTries.current!) {
      return;
    }


    for (let i = 0; i < numberOfTries.current!; i++) {
      board.push([]);
      for (let j = 0; j < lengthOfWord.current!; j++) {
        board[i].push({ classState: '', letter: '' });
      }
    }

  }

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

  //handling keydown on document
  const handleKeyDown = async (e: KeyboardEvent | MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // return if request have'nt finished
    if (waitingResponse.current) {
      return;
    }
    waitingResponse.current = true;

    const letter: string = (e as KeyboardEvent).key ? (e as KeyboardEvent).key : (e as MouseEvent<HTMLButtonElement>).currentTarget.value;
    const currentFocusedRow: gameTileType[] = board[currentRow.current];
    if (letters.includes(letter.toLowerCase())) {
      await write(letter, currentFocusedRow);
    }
    if (letter === "Backspace") {
      deleteWord(currentFocusedRow);
    }
    waitingResponse.current = false;
    setBoard([...board]);

  }

  const shouldMoveRow = async (currentFocusedRow: gameTileType[],) => {
    const win = await searchCorrectWords(currentFocusedRow);
    console.log("Done");
    currentRow.current++;
    currentCol.current = 0;
    if (win || currentRow.current === numberOfTries.current!) {
      winOrLose.current = win ? "Win" : "Lose";
      setGameEndPopup(true);
      rendered.current = false;
      document.removeEventListener('keydown', handleKeyDown);
      return
    }
  }

  const deleteWord = (currentFocusedRow: gameTileType[]) => {
    currentFocusedRow[currentCol.current].letter = '';
    if (currentCol.current > 0) {
      currentCol.current--;
    }
  }

  const write = async (letter: string, currentFocusedRow: gameTileType[]) => {
    if (!currentFocusedRow[currentCol.current].letter) {
      currentFocusedRow[currentCol.current].letter = letter.toUpperCase();
      currentCol.current++;
      if (currentCol.current > lengthOfWord.current! - 1) {
        await shouldMoveRow(currentFocusedRow);
      }
      return;
    }
    if (currentFocusedRow[currentCol.current].letter) {
      currentCol.current++;
      currentFocusedRow[currentCol.current].letter = letter.toUpperCase();
      if (currentCol.current === lengthOfWord.current! - 1) {
        await shouldMoveRow(currentFocusedRow);
      }
      return;
    }
  }

  const searchCorrectWords = async (currentFocusedRow: gameTileType[]) => {//search for correct words in the row
    const dataToSend = {
      currentFocusedRow,
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
      currentFocusedRow[i].classState = colorData.classState;
    });
    keyBoardGrid.current = colorDataRow.keyBoardGrid;
    return colorDataRow.win;
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

