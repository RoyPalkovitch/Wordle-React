import { Board } from "./board";
import { EndGamePopup } from "./endGamePopup";
import { boardContext } from "../../../context/boardContext";
import { useBoard } from "../../../hooks/useBoard";

export function Game(): JSX.Element {
  const boardApi = useBoard();

  return (
    <>
      <boardContext.Provider value={boardApi}>
        <main id="main">
          <Board />
        </main>
        <EndGamePopup />
      </boardContext.Provider>


    </>

  )
}