import { useContext, useRef } from "react";
import { AuthContext } from "../context/authContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export function Register() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const register = useContext(AuthContext)?.register;

  const handleRegister = () => {
    if (emailInputRef.current && passwordInputRef.current && register) {
      register(emailInputRef.current.value, passwordInputRef.current.value);
    }
    //setstate error
  }

  return (
    <Form className="w-50 mx-auto">
      <h3 className="text-center">Register</h3>
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
  )
}