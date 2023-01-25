import { useCallback, useContext, useEffect, useState } from "react"
import { gameConfigContext } from "../../../context/gameConfigContext";
import { gameConfigType } from "../../../hooks/types/gameConfigType";
import { GameTile } from "./gameTile";
import { gameTileType } from "../../../hooks/types/gameTileType";

export function GameTileContainer({ idx, rowFocus, keyboardObs, searchCorrectWords, setKeyBoardobs }: {
  idx: number, rowFocus: boolean, keyboardObs: string, searchCorrectWords: (row: gameTileType[]) => void, setKeyBoardobs: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element {
  const { lengthOfWord }: gameConfigType = useContext(gameConfigContext) as gameConfigType;
  const [rowState, setRowState] = useState<gameTileType[]>([]);
  const updateRow = (gameTile: gameTileType) => {
    rowState.push(gameTile);
    if (rowState.length === 5) {
      searchCorrectWords(rowState);
      return;
    }
    setRowState([...rowState]);
  };

  useEffect(() => {
    if (!keyboardObs || !rowFocus) return;
    rowState.push({ classState: '', letter: keyboardObs });
    setKeyBoardobs('');
    if (rowState.length === 5) {
      searchCorrectWords(rowState);
      return;
    }
    setRowState([...rowState]);
  }, [searchCorrectWords, rowState, setRowState, keyboardObs, rowFocus, setKeyBoardobs]);



  return (
    <div className="row">{
      Array.from(Array(lengthOfWord.current).keys()).map((j) => {
        return <GameTile
          key={`row-${idx}-cell-${j}`}
          gameTile={rowState[j] ? rowState[j] : { classState: '', letter: '' }}
          focus={rowFocus && j === rowState.length}
          updateRow={updateRow} />
      })
    }
    </div>
  )
}
