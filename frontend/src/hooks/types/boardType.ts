import { MouseEvent } from "react"
import { gameTileType } from "./gameTileType"

export type boardType = {
  board: gameTileType[][],
  letters: string,
  showGameEndPopup: boolean,
  currentRow: React.MutableRefObject<number>,
  currentCol: React.MutableRefObject<number>,
  keyBoardGrid: React.MutableRefObject<gameTileType[][]>,
  winOrLose: React.MutableRefObject<string>,
  setResetGame: React.Dispatch<React.SetStateAction<boolean>>,
  handleKeyDown: (e: KeyboardEvent | MouseEvent<HTMLButtonElement>) => void
}