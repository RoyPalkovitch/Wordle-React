import { useContext } from "react";
import { GameTileContainer } from "./gameTileContainer";
import React from "react";
import { gameConfigContext } from "../../../context/gameConfigContext";
import { gameConfigType } from "../../../hooks/types/gameConfigType";



export function Board(): JSX.Element {
  const { numberOfTries }: gameConfigType = useContext(gameConfigContext) as gameConfigType;

  return (
    <React.StrictMode>
      <section className="guess-container">
        {Array.from(new Array(numberOfTries.current).keys()).map((i) => {
          return (
            <GameTileContainer key={`row-${i}`} idx={i} />
          )
        })}
      </section>
    </React.StrictMode>

  )
}