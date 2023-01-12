import { useContext, MouseEvent } from "react";
import { boardContext } from "../../../context/boardContext";
import { boardType } from "../../../hooks/types/boardType";

type propsType = {
  key: string,
  currentKey: currentKeyboardKeyType
}

export type currentKeyboardKeyType = {
  classState: string,
  letter: string
}

export function KeyboardTile(props: propsType): JSX.Element {

  const { handleKeyDown }: boardType = useContext(boardContext) as boardType;

  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleKeyDown(event);
  }
  return (
    <button className={props.currentKey.classState} value={props.currentKey.letter} onClick={handleOnClick}>{props.currentKey.letter}</button>
  )
}