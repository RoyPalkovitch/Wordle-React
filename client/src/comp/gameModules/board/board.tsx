import { useContext, useRef, useState } from "react";
import { GameTileContainer } from "./gameTileContainer";
import React from "react";
import { gameConfigContext } from "../../../context/gameConfigContext";
import { gameConfigType } from "../../../hooks/types/gameConfigType";
import { gameTileType } from "../../../hooks/types/gameTileType";
import { KeyboardRow } from "../keyboard/keyboardRow";



export function Board(): JSX.Element {
  const letters: string = "qwertyuiopasdfghjklzxcvbnm";
  const { numberOfTries }: gameConfigType = useContext(gameConfigContext) as gameConfigType;
  const [board, setBoard] = useState<gameTileType[][]>([]);
  const [keyboardObs, setKeyBoardobs] = useState('');

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

  const searchCorrectWords = (row: gameTileType[]) => {
    board.push(row);
    setBoard([...board]);
  }

  return (
    <React.StrictMode>
      <section className="guess-container">
        {Array.from(new Array(numberOfTries.current).keys()).map((i) => {
          return (
            <GameTileContainer key={`row-${i}`}
              idx={i}
              rowFocus={i === board.length}
              keyboardObs={keyboardObs}
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

    </React.StrictMode>

  )
}