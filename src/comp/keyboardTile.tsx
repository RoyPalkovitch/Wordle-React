import { useContext, MouseEvent } from "react";
import { boardContext } from "../context/boardContext";


interface Iprops {
  key: string,
  currentKey: currentKeyboardKey
}

export interface currentKeyboardKey {
  classState: string,
  letter: string
}

export function KeyboardTile(props: Iprops) {

  const handleKeyDown = useContext(boardContext)?.handleKeyDown;

  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (handleKeyDown) {
      handleKeyDown(event);
    }
  }
  return (
    <button className={props.currentKey.classState} value={props.currentKey.letter} onClick={handleOnClick}>{props.currentKey.letter}</button>
  )
}