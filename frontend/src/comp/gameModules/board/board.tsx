import { useContext } from "react";
import { boardContext } from "../../../context/boardContext"
import { GameTileContainer } from "./gameTileContainer";
import { GameTile } from "./gameTile";
import { boardType } from "../../../hooks/types/boardType";
import { gameTileType } from "../../../hooks/types/gameTileType";
import React from "react";

export function Board(): JSX.Element {

  const { board, currentRow, currentCol }: boardType = useContext(boardContext) as boardType;
  return (
    <React.StrictMode>
      <section className="guess-container">
        {board.map((container: gameTileType[], i) => {
          return (
            <GameTileContainer key={`row-${i}`}>
              {container.map((gameTile, j) => {
                return (
                  <GameTile key={`row-${i}-col-${j}`} letter={gameTile.letter}
                    classState={
                      (currentRow.current === i && currentCol.current === j) ?
                        "col game-tile focus " : "col game-tile " + (gameTile.classState)} />
                )
              })}
            </GameTileContainer>)
        })}
      </section>
    </React.StrictMode>

  )
}