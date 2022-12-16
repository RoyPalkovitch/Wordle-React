import { Board } from "./board";
import { Keyboard } from "./keyboard";
import { EndGamePopup } from "./endGamePopup";
import { useBoard } from "../hooks/useBoard";
import { boardContext } from "../context/boardContext";

export function Game() {
  const boardApi = useBoard();

  return (
    <boardContext.Provider value={boardApi}>
      <main id="main">
        <Board />
        <Keyboard />
        <EndGamePopup />
      </main>

    </boardContext.Provider>
  )
}