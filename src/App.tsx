import { Nav } from "./comp/nav";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { useGameConfig } from "./hooks/useGameConfig";
import { useAuth } from "./hooks/useAuth";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { gameConfigContext } from "./context/gameConfigContext";

function App() {
  const authAPI = useAuth();
  const gameConfig = useGameConfig();
  return (
    <>
      <AuthContext.Provider value={authAPI}>
        <gameConfigContext.Provider value={gameConfig}>
          <Nav />
          <Outlet />
        </gameConfigContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
