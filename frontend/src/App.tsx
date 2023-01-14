import { Nav } from "./comp/navbarModules/nav";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { useGameConfig } from "./hooks/useGameConfig";
import { useAuth } from "./hooks/useAuth";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { gameConfigContext } from "./context/gameConfigContext";
import { useModalObs } from "./hooks/useModalObs";
import { ModalObsContext } from "./context/modalObsContext";

function App() {
  const authAPI = useAuth();
  const gameConfig = useGameConfig();
  const modalObs = useModalObs();
  return (
    <>
      <AuthContext.Provider value={authAPI}>
        <ModalObsContext.Provider value={modalObs}>
          <gameConfigContext.Provider value={gameConfig}>
            <Nav />
            <Outlet />
          </gameConfigContext.Provider>
        </ModalObsContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
