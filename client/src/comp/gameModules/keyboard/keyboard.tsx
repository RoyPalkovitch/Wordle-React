import { useContext, useEffect } from "react";
import { KeyboardRow } from "./keyboardRow";
import { boardContext } from "../../../context/boardContext"
import { boardType } from "../../../hooks/types/boardType";

export function Keyboard(): JSX.Element {
  const { createKeyboard }: boardType = useContext(boardContext) as boardType;
  useEffect(() => {
    createKeyboard();
  }, [createKeyboard]);
  return (
    <section id="keyboard">
      {Array.from(new Array(3).keys()).map((currentRow, i) => {
        return (
          <KeyboardRow key={`row-${i}`} currentRow={currentRow} />)
      })}
    </section>
  )
}