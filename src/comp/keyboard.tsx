import { useContext } from "react";
import { KeyboardRow } from "./keyboardRow";
import { KeyboardTile } from "./keyboardTile";
import { boardContext } from "../context/boardContext"



export function Keyboard() {
  const keyBoardGrid = useContext(boardContext)?.keyBoardGrid;
  if (!keyBoardGrid) {
    return;
  }
  return (
    <section id="keyboard">
      {keyBoardGrid.current.map((currentRow, currentKeysRow) => {
        return (
          <KeyboardRow key={`row-${currentKeysRow}`} currentKeysRow={currentKeysRow}>
            {currentRow.map((currentKey, currentKeyPos) => {
              return (
                <KeyboardTile key={`row-${currentKeysRow}-col-${currentKeyPos}`}
                  currentKey={currentKey}
                />
              )
            })}
          </KeyboardRow>)
      })}
    </section>
  )
}