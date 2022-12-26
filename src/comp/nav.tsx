import { Button } from "react-bootstrap";
import { useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { InfoModalPopup } from "./infoModalPopup";
import { GameConfigModal } from "./gameConfigModal";
import { authType } from "../hooks/useAuth";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';



export function Nav(): JSX.Element {
  let navigate = useNavigate();
  let currentLocation = useLocation().pathname;
  const { currentUser, setCurrentUser }: authType = useContext(AuthContext) as authType;
  const [showInfo, setShowInfo] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const handleShowInfo = () => setShowInfo(true);
  const handleShowConfig = () => setShowConfig(true);

  const handleLogout = () => {
    if (setCurrentUser)
      setCurrentUser({ name: '' })
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
                  <Button onClick={() => { navigate('/sign-in') }} >Sign In</Button>
                </Navbar.Text>
                <Navbar.Text className="px-5">
                  <Button onClick={() => { navigate('/register') }} >Register</Button>
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
