import { MouseEvent } from "react"
import { gameTileType } from "./gameTileType"
import { cellRef } from "../../comp/gameModules/board/gameTile";

export type boardType = {
  letters: string,
  boardRef: React.MutableRefObject<React.MutableRefObject<cellRef[]>[] | undefined>,
  keyBoardGrid: React.MutableRefObject<React.MutableRefObject<[gameTileType, React.Dispatch<React.SetStateAction<gameTileType>>][]>[] | undefined>,
  rendered: React.MutableRefObject<boolean>,
  showGameEndPopup: boolean,
  createKeyboard: () => void;
  currentRow: React.MutableRefObject<number>,
  currentCol: React.MutableRefObject<number>,
  winOrLose: React.MutableRefObject<string>,
  setResetGame: React.Dispatch<React.SetStateAction<boolean>>,
  handleKeyDown: (e: KeyboardEvent | MouseEvent<HTMLButtonElement>) => void
}