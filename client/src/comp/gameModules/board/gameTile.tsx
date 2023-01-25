import { useEffect, useRef } from "react";
import { gameTileType } from "../../../hooks/types/gameTileType";

export function GameTile({ gameTile, updateRow, focus }: { gameTile: gameTileType, focus: boolean, updateRow: (gameTile: gameTileType) => void }): JSX.Element {
  const tileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    focus && tileRef.current!.focus();
  });

  const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.toUpperCase();
    gameTile.letter = e.target.value;
    updateRow(gameTile);
  }

  return (<input
    ref={tileRef}
    disabled={!focus}
    onChange={(e) => changeHandle(e)}
    maxLength={1}
    value={gameTile.letter}
    className={"col game-tile" + gameTile.classState}
  />);
}


