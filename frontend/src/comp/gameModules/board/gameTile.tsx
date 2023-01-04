import React from "react";
import { gameTileType } from "../../../hooks/useBoard"


function GameTileComp({ classState, letter }: gameTileType): JSX.Element {
  return (<div className={classState}>{letter} </div>)
}

export const GameTile = React.memo(GameTileComp);
