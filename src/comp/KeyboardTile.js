import { useContext } from "react";
import { boardContext } from "../context/boardContext";


export function KeyboardTile({ currentKey }) {
  const { handleKeyDown } = useContext(boardContext);

  return (
    <button className={currentKey.className} value={currentKey.letter} onClick={handleKeyDown}>{currentKey.letter}</button>
  )
}