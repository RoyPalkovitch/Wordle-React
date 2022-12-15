import { useRef, useContext } from "react";
import { KeyboardRow } from "./KeyboardRow";
import { KeyboardTile } from "./KeyboardTile";
import { boardContext } from "../context/boardContext"


export function KeyBoard() {
  const { keyBoardGrid } = useContext(boardContext);
  return (
    <section id="keyboard">

      {keyBoardGrid.current.map((currentRow, currentKeysRow) => {
        return (
          <KeyboardRow key={`row-${currentKeysRow}`}>
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


// <section id="keyboard">
//         {[...Array(3).keys()].map((currentKeysRow) => {
//           return <KeyboardRow key={`row-${currentKeysRow}`} currentKeysRow={currentKeysRow}>
//             {[...Array(10).keys()].map((currentKeyPos) => {
//               if ((currentKeysRow === 1 && currentKeyPos === 9) || (currentKeysRow === 2 && currentKeyPos === 9)) {
//                 return null
//               }
//               return <KeyboardTile key={`row-${currentKeysRow}-col-${currentKeyPos}`}
//                 currentKeysRow={currentKeysRow}
//                 currentKeyPos={currentKeyPos}
//                 lettersCountRef={lettersCountRef} />
//             })}

//           </KeyboardRow>
//         })}
//       </section>


// {[...Array(3).keys()].map((currentKeysRow) => {
//   return <KeyboardRow key={`row-${currentKeysRow}`} currentKeysRow={currentKeysRow}>
//     {[...Array(10).keys()].map((currentKeyPos) => {
//       if ((currentKeysRow === 1 && currentKeyPos === 9) || (currentKeysRow === 2 && currentKeyPos === 9)) {
//         return null
//       }
//       return <KeyboardTile key={`row-${currentKeysRow}-col-${currentKeyPos}`}
//         currentKeysRow={currentKeysRow}
//         currentKeyPos={currentKeyPos}
//         lettersCountRef={lettersCountRef} />
//     })}

//   </KeyboardRow>