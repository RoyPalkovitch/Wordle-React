import { Board } from "../comp/Board";
import { Popup } from "../comp/Popup";
import { useBoard } from "../hooks/useBoard";
import { boardContext } from "../context/boardContext";

export function Game() {
  const boardApi = useBoard();

  return (
    <boardContext.Provider value={boardApi}>
      <Board />
      <Popup />
    </boardContext.Provider>
  )
}