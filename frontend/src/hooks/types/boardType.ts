import { MouseEvent } from "react"
import { cellRef } from "../../comp/gameModules/board/gameTile";
import { keyboardTileType } from "../../comp/gameModules/keyboard/keyboardTile";

export type boardType = {
  letters: string,
  showGameEndPopup: boolean,
  setResetGame: React.Dispatch<React.SetStateAction<boolean>>,
  boardRef: React.MutableRefObject<React.MutableRefObject<cellRef[]>[] | undefined>,
  keyBoardGrid: React.MutableRefObject<React.MutableRefObject<keyboardTileType[]>[] | undefined>,
  rendered: React.MutableRefObject<boolean>,
  currentRow: React.MutableRefObject<number>,
  currentCol: React.MutableRefObject<number>,
  winOrLose: React.MutableRefObject<string>,
  createKeyboard: () => void;
  handleKeyDown: (e: KeyboardEvent | MouseEvent<HTMLButtonElement>) => void
}