import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { authType } from "../../hooks/useAuth";
import { ModalpropsType } from "./navTypes";
import { Modal } from "react-bootstrap";

export function Register(props: ModalpropsType) {

  const { register, emailInputRef, passwordInputRef }: authType = useContext(AuthContext) as authType;

  const handleRegister = () => {
    if (emailInputRef.current && passwordInputRef.current && register) {
      props.onHide();
      register(emailInputRef.current.value, passwordInputRef.current.value);
    }
    //setstate error
  }

  return (
    <Modal
      {...props}
      size="lg"
      centered
      autoFocus={true}
      backdrop="static"
      onEscapeKeyDown={props.onHide}
    >
      <Modal.Header closeButton>
        <h3 className="text-center">Register</h3>
      </Modal.Header>
      <Modal.Body>
        <Form className="w-50 mx-auto">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={emailInputRef} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={passwordInputRef} />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleRegister}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}