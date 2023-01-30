import { gameTileType } from "../../../hooks/types/gameTileType";


export function KeyboardTile({ keyboardTile, clickNotify }: { keyboardTile: gameTileType, clickNotify: (letter: string) => void }): JSX.Element {

  return (
    <button
      onClick={() => clickNotify(keyboardTile.letter)}
      className={keyboardTile.classState}
      value={keyboardTile.letter}>
      {keyboardTile.letter}
    </button>
  )
}


