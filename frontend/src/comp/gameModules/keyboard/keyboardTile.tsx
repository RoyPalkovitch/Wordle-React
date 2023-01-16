import { useContext, MouseEvent, useState, useRef, useEffect } from "react";
import { boardContext } from "../../../context/boardContext";
import { boardType } from "../../../hooks/types/boardType";
import { cellState } from "../board/gameTile";
import { gameTileType } from "../../../hooks/types/gameTileType";

export interface KeyboardTileCompProps {
  updateRef: (cell: cellState) => void,
}

export function KeyboardTile(props: KeyboardTileCompProps): JSX.Element {
  const { handleKeyDown }: boardType = useContext(boardContext) as boardType;
  const tile: cellState = useState<gameTileType>({ classState: '', letter: '' });
  const rendered = useRef(false);
  const updateRef = props.updateRef;

  useEffect(() => {
    if (!rendered.current)
      updateRef(tile);
    rendered.current = true
  }, [updateRef, tile]);


  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleKeyDown(event);
  }
  return (
    <button className={tile[0].classState} value={tile[0].letter} onClick={handleOnClick}>{tile[0].letter}</button>
  )
}


