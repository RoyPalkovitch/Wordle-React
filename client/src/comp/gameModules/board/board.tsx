import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GameTileContainer } from "./gameTileContainer";
import { gameConfigContext } from "../../../context/gameConfigContext";
import { gameConfigType } from "../../../hooks/types/gameConfigType";
import { gameTileType } from "../../../hooks/types/gameTileType";
import { KeyboardRow } from "../keyboard/keyboardRow";
import { EndGamePopup } from "./endGamePopup";



export function Board(): JSX.Element {
  const { numberOfTries, propChanged, setPropChange }: gameConfigType = useContext(gameConfigContext) as gameConfigType;
  const [board, setBoard] = useState<gameTileType[][]>([]);
  const [keyboardObs, setKeyBoardobs] = useState('');
  const [endGamePopup, setGameEndPopup] = useState(false);
  const [resetGame, setResetGame] = useState(false);
  const winOrLose = useRef("");
  const currentWord = useRef(-1);

  const fetchWord = async (): Promise<number> => {
    const req = await fetch(`http://localhost:3003/game`);
    const word = +await req.text();
    return word
  }

  const createKeyBoard = () => {
    const letters: string = "qwertyuiopasdfghjklzxcvbnm";
    const keyBoard: gameTileType[][] = [];
    let letterCount = 0;
    Array.from(Array(3).keys()).forEach((i) => {
      keyBoard.push([]);
      Array.from(Array(10).keys()).forEach((j) => {
        if ((i === 1 && j === 9) || (i === 2 && (j >= 8 || j === 0))) {
          return;
        }
        if (letterCount < 26) {
          keyBoard[i].push({ classState: 'keyboard-tile', letter: letters[letterCount].toUpperCase() })
          letterCount++;
        }
      });
    });
    return keyBoard;
  }

  const keyboard = useRef<gameTileType[][]>(createKeyBoard());

  const searchCorrectWords = async (row: gameTileType[]) => {
    const dataToSend = {
      rowData: row,
      currentWord: currentWord.current,
      keyboard: keyboard.current
    }
    const request = await fetch(`http://localhost:3003/game/searchcorrectwords`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      }
    );
    const responseData = await request.json() as
      { rowData: gameTileType[], keyboard: gameTileType[][], win: boolean };
    responseData.rowData.forEach((colorData, i) => {
      row[i].classState = colorData.classState;
    });
    keyboard.current = responseData.keyboard;
    board.push(row);
    setBoard([...board]);
    if (responseData.win || board.length === numberOfTries.current!) {
      winOrLose.current = responseData.win ? "Win" : "Lose";
      setGameEndPopup(true);
    }
  }

  const setGame = useCallback(() => {
    fetchWord().then(word => currentWord.current = word);
    board.splice(0);
    keyboard.current = createKeyBoard();
    setPropChange(false);
    setResetGame(false);
    setBoard([...board]);
  }, [board, setBoard, setPropChange, setResetGame])

  useEffect(() => {
    if (resetGame || propChanged) {
      setGame();
      return
    }
  }, [setGame, resetGame, propChanged]);

  useEffect(() => {
    fetchWord().then(word => currentWord.current = word);
  }, [])


  return (
    <React.StrictMode>
      <>
        <section className="guess-container">
          {Array.from(new Array(numberOfTries.current).keys()).map((i) => {
            return (
              <GameTileContainer key={`row-${i}`}
                idx={i}
                rowFocus={(i === board.length)}
                keyboardObs={keyboardObs}
                resetGame={resetGame}
                setKeyBoardobs={setKeyBoardobs}
                searchCorrectWords={searchCorrectWords}
              />
            )
          })}
        </section>
        <section id="keyboard">
          {keyboard.current.map((keyboardRow, rowNum) => {
            return (
              <KeyboardRow
                key={`row-${rowNum}`}
                rowNum={rowNum}
                setKeyBoardobs={setKeyBoardobs}
                keyboardRow={keyboardRow}
              />)
          })}
        </section>
        <EndGamePopup winOrLose={winOrLose} endGamePopup={endGamePopup} setResetGame={setResetGame} setGameEndPopup={setGameEndPopup} />
      </>
    </React.StrictMode>

  )
}