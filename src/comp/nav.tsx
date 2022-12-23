import { Button } from "react-bootstrap";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { InfoModalPopup } from "./infoModalPopup";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';



export function Nav() {
  let navigate = useNavigate();

  const [currentUser, setCurrentUser] = [useContext(AuthContext)?.currentUser, useContext(AuthContext)?.setCurrentUser];
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

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
            <Button onClick={handleShow}>Info</Button>
            <InfoModalPopup show={show} onHide={() => setShow(false)} />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}
