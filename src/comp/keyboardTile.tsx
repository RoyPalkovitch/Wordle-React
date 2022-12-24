import { useContext, MouseEvent } from "react";
import { boardContext } from "../context/boardContext";


type propsType = {
  key: string,
  currentKey: currentKeyboardKeyType
}

export type currentKeyboardKeyType = {
  classState: string,
  letter: string
}

export function KeyboardTile(props: propsType): JSX.Element {

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