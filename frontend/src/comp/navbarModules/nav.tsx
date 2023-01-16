import { Button } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import { useState, useContext } from "react";
import { authType } from "../../hooks/types/authType";
import Container from 'react-bootstrap/Container';
import { InfoModalPopup } from "./info";
import { AuthContext } from "../../context/authContext";
import { Link, useLocation } from "react-router-dom";
import { GameConfigModal } from "../gameModules/board/gameConfigModal"
import { SignIn } from "./signIn";
import { modalObsType } from "../../hooks/types/modalObsType";
import { ModalObsContext } from "../../context/modalObsContext";



export function Nav(): JSX.Element {
  let currentLocation = useLocation().pathname;
  const { currentUser, logOut }: authType = useContext(AuthContext) as authType;
  const { setModalObs }: modalObsType = useContext(ModalObsContext) as modalObsType;
  const [showInfo, setShowInfo] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleShow = (setShow: (value: React.SetStateAction<boolean>) => void, value: boolean) => {
    setModalObs(value);
    setShow(value);
  }

  const handleLogout = () => {
    logOut();
  }


  return (
    <Navbar>
      <Container>
        <Navbar.Brand><Link className="text-decoration-none text-dark" to="/">Wordle</Link></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end ">
          {currentUser?.userName ? (
            <>
              <Navbar.Text className="px-5">
                Welcome: {currentUser.userName}
              </Navbar.Text>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) :
            (
              <>
                <Navbar.Text className="px-5">
                  <Button onClick={() => handleShow(setShowSignIn, true)}>Sign In</Button>
                  <SignIn show={showSignIn} onHide={() => handleShow(setShowSignIn, false)} />
                </Navbar.Text>
              </>
            )}

          <Navbar.Text className="px-5">
            <Button onClick={() => handleShow(setShowInfo, true)}>Info</Button>
            <InfoModalPopup show={showInfo} onHide={() => handleShow(setShowInfo, false)} />
          </Navbar.Text>
          <>
            {currentLocation === '/game' ? (
              <Navbar.Text className="px-5">
                <Button onClick={() => handleShow(setShowConfig, true)}>Config</Button>
                <GameConfigModal show={showConfig} onHide={() => handleShow(setShowConfig, false)} />
              </Navbar.Text>
            ) : null}

          </>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}
