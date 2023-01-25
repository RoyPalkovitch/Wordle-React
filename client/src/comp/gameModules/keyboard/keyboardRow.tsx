import { KeyboardTile } from "./keyboardTile"
import { gameTileType } from "../../../hooks/types/gameTileType";


export function KeyboardRow({ rowNum, setKeyBoardobs, keyboardRow }: { rowNum: number, setKeyBoardobs: React.Dispatch<React.SetStateAction<string>>, keyboardRow: gameTileType[] }): JSX.Element {

  const clickNotify = (letter: string) => {
    setKeyBoardobs(letter);
  }

  return (
    <div className={rowNum !== 1 ? 'row' : 'row row-small'}>
      {keyboardRow.map((keyboardTile, tileNum) => {
        return (
          <KeyboardTile key={`row-${rowNum}-col-${tileNum}`} keyboardTile={keyboardTile} clickNotify={clickNotify} />
        )
      })}</div>
  )
}