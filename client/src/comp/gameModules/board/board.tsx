import { useContext, useEffect, useRef, useState } from "react";
import { GameTileContainer } from "./gameTileContainer";
import React from "react";
import { gameConfigContext } from "../../../context/gameConfigContext";
import { gameConfigType } from "../../../hooks/types/gameConfigType";
import { gameTileType } from "../../../hooks/types/gameTileType";
import { KeyboardRow } from "../keyboard/keyboardRow";
import { EndGamePopup } from "./endGamePopup";



export function Board(): JSX.Element {
  const letters: string = "qwertyuiopasdfghjklzxcvbnm";
  const { numberOfTries, propChanged, setPropChange }: gameConfigType = useContext(gameConfigContext) as gameConfigType;
  const [board, setBoard] = useState<gameTileType[][]>([]);
  const [keyboardObs, setKeyBoardobs] = useState('');
  const [endGamePopup, setGameEndPopup] = useState(false);
  const [resetGame, setResetGame] = useState(false);
  const winOrLose = useRef("");
  const currentWord = useRef('');
  const createKeyBoard = () => {
    const keyBoard: gameTileType[][] = [];
    let letterCount = 0;
    Array.from(Array(3).keys()).forEach((i) => {
      keyBoard.push([]);
      Array.from(Array(10).keys()).forEach((j) => {
        if ((i === 1 && j === 9) || (i === 2 && j > 8)) {
          return;
        }
        if (i === 2 && (j === 0 || j === 8)) {
          keyBoard[i].push({ classState: 'keyboard-tile keyboard-tile-large ', letter: j === 8 ? 'Backspace' : 'Enter' })
          return
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

  useEffect(() => {
    if (resetGame || propChanged) {
      board.splice(0);
      keyboard.current = createKeyBoard();
      setBoard([...board]);
      setPropChange(false);
      setResetGame(false);
      return
    }
    fetch(`http://localhost:3003/game`)
      .then(response => response.text())
      .then(response => currentWord.current = response.toUpperCase());
  }, [resetGame, board, propChanged, setPropChange]);



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