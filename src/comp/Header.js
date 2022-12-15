import { Button } from "react-bootstrap";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { ModalPage } from "./ModalPage";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';



export function Header() {
  let navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  return (
    <Navbar>
      <Container>
        <Navbar.Brand><Link className="text-decoration-none text-dark" to="/">Wordle</Link></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end ">
          {currentUser ? (
            <>
              <Navbar.Text className="px-5">
                Welcome: {currentUser.name}
              </Navbar.Text>
              <Button onClick={() => setCurrentUser(null)}>Logout</Button>
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
            <ModalPage show={show} onHide={() => setShow(false)} />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}