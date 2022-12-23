import { useContext, MouseEvent } from "react";
import { boardContext } from "../context/boardContext";

type currentKeyboardKey = {
  classState: string,
  letter: string
}

export function KeyboardTile(currentKey: currentKeyboardKey) {

  const handleKeyDown = useContext(boardContext)?.handleKeyDown;

  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (handleKeyDown) {
      handleKeyDown(event);
    }
  }
  return (
    <button className={currentKey.classState} value={currentKey.letter} onClick={handleOnClick}>{currentKey.letter}</button>
  )
}