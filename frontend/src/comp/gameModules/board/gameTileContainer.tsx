import { useRef, useEffect, useContext } from "react"
import { boardContext } from "../../../context/boardContext";
import { boardType } from "../../../hooks/types/boardType";
import { gameConfigContext } from "../../../context/gameConfigContext";
import { gameConfigType } from "../../../hooks/types/gameConfigType";
import { GameTile, cellState } from "./gameTile";


export function GameTileContainer({ idx }: { idx: number }): JSX.Element {
  const { boardRef, currentRow, currentCol }: boardType = useContext(boardContext) as boardType;
  const { lengthOfWord }: gameConfigType = useContext(gameConfigContext) as gameConfigType;
  const rowRef = useRef<cellState[]>([]);
  console.log('rendered ' + idx);
  useEffect(() => {
    if (!boardRef.current?.includes(rowRef))
      boardRef.current?.push(rowRef);
    console.log(boardRef.current);
  }, [boardRef]);



  const updateRowRef = (cell: cellState) => {
    rowRef.current.push(cell);
  }
  return (
    <div className="row">{
      Array.from(new Array(lengthOfWord.current).keys()).map((j) => {
        return (
          <GameTile key={`row-${idx}-cell-${j}`} rowCell={{ row: idx, cell: j }} classInit={
            (currentRow.current === idx && currentCol.current === j) ?
              "col game-tile focus " : "col game-tile "} updateRef={updateRowRef} />
        )
      })
    }
    </div>
  )
}
