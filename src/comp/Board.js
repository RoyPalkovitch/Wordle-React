import React, { useContext } from "react";
import { boardContext } from "../context/boardContext"
import { GameTileContainer } from "./gameTileContainer";
import { GameTile } from "./gameTile";


export function Board() {

  const { board, currentRow, currentCol } = useContext(boardContext);
  return (
    <section className="guess-container">
      {board.map((container, i) => {
        return (
          <GameTileContainer key={`row-${i}`} container={container}>
            {container.map((gameTile, j) => {
              return (
                <GameTile key={`row-${i}-col-${j}`} letterPos={gameTile}
                  classes={
                    (currentRow.current === i && currentCol.current === j) ?
                      "col game-tile focus " : "col game-tile " + (gameTile.classState)} />
              )
            })}
          </GameTileContainer>)
      })}
    </section>
  )
}