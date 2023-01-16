import { MouseEvent } from "react"
import { gameTileType } from "./gameTileType"

export type boardType = {
  letters: string,
  boardRef: React.MutableRefObject<React.MutableRefObject<[gameTileType, React.Dispatch<React.SetStateAction<gameTileType>>][]>[] | undefined>,
  rendered: React.MutableRefObject<boolean>,
  showGameEndPopup: boolean,
  currentRow: React.MutableRefObject<number>,
  currentCol: React.MutableRefObject<number>,
  keyBoardGrid: React.MutableRefObject<gameTileType[][]>,
  winOrLose: React.MutableRefObject<string>,
  setResetGame: React.Dispatch<React.SetStateAction<boolean>>,
  handleKeyDown: (e: KeyboardEvent | MouseEvent<HTMLButtonElement>) => void
}