import { useEffect, useRef, useState } from "react";
import { gameTileType } from "../../../hooks/types/gameTileType";

export type cellState = [gameTileType, React.Dispatch<React.SetStateAction<gameTileType>>];
interface gameTileCompProps {
  updateRef: (cell: cellState) => void,
  rowCell: {
    row: number;
    cell: number;
  },
  classInit: string
}

export function GameTile(props: gameTileCompProps): JSX.Element {
  const updateRef = props.updateRef;
  const tile: cellState = useState<gameTileType>({ classState: props.classInit, letter: '' });
  const rendered = useRef(false);
  useEffect(() => {
    if (!rendered.current)
      updateRef(tile);
    rendered.current = true
  }, [updateRef, tile]);

  return (<div className={tile[0].classState}>{tile[0].letter} </div>)
}
