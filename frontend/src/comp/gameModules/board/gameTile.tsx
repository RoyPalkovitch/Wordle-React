import { memo } from "react";
import { gameTileType } from "../../../hooks/types/gameTileType";

function GameTileComp({ classState, letter }: gameTileType): JSX.Element {
  return (<div className={classState}>{letter} </div>)
}

export const GameTile = memo(GameTileComp);
