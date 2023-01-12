import { Button } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import { useState, useContext } from "react";
import { authType } from "../../hooks/useAuth";
import Container from 'react-bootstrap/Container';
import { InfoModalPopup } from "./info";
import { AuthContext } from "../../context/authContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { GameConfigModal } from "../gameModules/board/gameConfigModal"
import { SignIn } from "./signIn";
import { Register } from "./register";



export function Nav(): JSX.Element {
  let navigate = useNavigate();
  let currentLocation = useLocation().pathname;
  const { currentUser, logOut }: authType = useContext(AuthContext) as authType;
  const [showInfo, setShowInfo] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const handleShowSignIn = () => setShowSignIn(true);
  const handleShowRegister = () => setShowRegister(true);
  const handleShowInfo = () => setShowInfo(true);
  const handleShowConfig = () => setShowConfig(true);

  const handleLogout = () => {
    console.log(showRegister);
    logOut();
  }


  return (
    <Navbar>
      <Container>
        <Navbar.Brand><Link className="text-decoration-none text-dark" to="/">Wordle</Link></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end ">
          {currentUser?.name ? (
            <>
              <Navbar.Text className="px-5">
                Welcome: {currentUser.name}
              </Navbar.Text>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) :
            (
              <>
                <Navbar.Text className="px-5">
                  <Button onClick={handleShowSignIn}>Sign In</Button>
                  <SignIn show={showSignIn} onHide={() => setShowSignIn(false)} />
                </Navbar.Text>
                <Navbar.Text className="px-5">
                  <Button onClick={handleShowRegister}>Register</Button>
                  <Register show={showRegister} onHide={() => setShowRegister(false)} />
                </Navbar.Text>

              </>
            )}

          <Navbar.Text className="px-5">
            <Button onClick={handleShowInfo}>Info</Button>
            <InfoModalPopup show={showInfo} onHide={() => setShowInfo(false)} />
          </Navbar.Text>
          <>
            {currentLocation === '/game' ? (
              <Navbar.Text className="px-5">
                <Button onClick={handleShowConfig}>Config</Button>
                <GameConfigModal show={showConfig} onHide={() => setShowConfig(false)} />
              </Navbar.Text>
            ) : null}

          </>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}
