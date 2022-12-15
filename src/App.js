import { Header } from "./comp/Header";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { useAuth } from "./hooks/useAuth";

function App() {
  const authApi = useAuth();
  return (
    <>
      <AuthContext.Provider value={authApi}>
        <Header />
        <Outlet />
      </AuthContext.Provider>
    </>
  );
}

export default App;
