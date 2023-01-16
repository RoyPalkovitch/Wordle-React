import { useRef, useEffect, useContext } from "react";
import { cellState } from "../board/gameTile";
import { KeyboardTile } from "./keyboardTile"
import { boardContext } from "../../../context/boardContext";
import { boardType } from "../../../hooks/types/boardType";


export function KeyboardRow({ currentRow }: { currentRow: number }): JSX.Element {
  const { keyBoardGrid }: boardType = useContext(boardContext) as boardType;
  const rowRef = useRef<cellState[]>([]);

  useEffect(() => {
    if (!keyBoardGrid.current?.includes(rowRef))
      keyBoardGrid.current?.push(rowRef);
    console.log(keyBoardGrid.current);
  }, [keyBoardGrid]);

  const updateRowRef = (cell: cellState) => {
    rowRef.current.push(cell);
  };

  return (
    <div className={'row' + (currentRow === 1 ? ' row-small' : '')}>
      {Array.from(new Array(10).keys()).map((currentCell) => {
        if ((currentRow === 1 && currentCell > 8) || (currentRow === 2 && currentCell > 7)) {
          return <></>
        }
        return (
          <KeyboardTile key={`row-${currentRow}-col-${currentCell}`} updateRef={updateRowRef} />
        )
      })}</div>
  )
}