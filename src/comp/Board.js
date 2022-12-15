import React, { useContext } from "react";
import { boardContext } from "../context/boardContext"
import { TileContainer } from "./TileContainer";
import { GameTile } from "./GameTile";
import { KeyboardRow } from "./KeyboardRow";
import { KeyboardTile } from "./KeyboardTile";
import { useRef } from "react";
import { KeyBoard } from "./Keyboard";


export function Board() {
  const { board, currentRow, currentCol } = useContext(boardContext);
  // eslint-disable-next-line
  const keyBoardTileRef = ([]);
  const lettersCountRef = useRef(0);


  return (
    <main id="main">
      <section className="guess-container">
        {board.map((container, i) => {
          return <TileContainer key={`row-${i}`} container={container}>
            {container.map((gameTile, j) => {
              return <GameTile key={`row-${i}-col-${j}`} letterPos={gameTile}
                classes={
                  (currentRow.current === i && currentCol.current === j) ?
                    "col game-tile focus " : "col game-tile " + (gameTile.correct)} />
            })}
          </TileContainer>
        })}
      </section>
      <KeyBoard />
    </main>
  )
}