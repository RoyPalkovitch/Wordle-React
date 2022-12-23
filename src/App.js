import { Nav } from "./comp/nav";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { useAuth } from "./hooks/useAuth";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function App() {
  const authAPI = useAuth();

  return (
    <>
      <AuthContext.Provider value={authAPI}>
        <Nav />
        <Outlet />
      </AuthContext.Provider>
    </>
  );
}

export default App;
