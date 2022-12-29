import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export type authType = {
  currentUser: { name: string },
  setCurrentUser: React.Dispatch<React.SetStateAction<{ name: string; }>>,
  emailInputRef: React.RefObject<HTMLInputElement>,
  passwordInputRef: React.RefObject<HTMLInputElement>,
  login: (userName: string, password: string) => void,
  register: (userName: string, password: string) => void
}


export function useAuth(): authType {
  const [currentUser, setCurrentUser] = useState({ name: '' });
  const fakeDB = useRef([{ userName: '', password: '' }]);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const login = (userName: string, password: string) => {
    if (checkDB(userName, password)) {
      fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(response => response.json())
        .then((user) => {
          setCurrentUser(user);
          navigate('/');
        })
    } else {
      alert("Can't find user")
    }
  }

  const register = (userName: string, password: string) => {
    if (!checkDB(userName, password)) {
      fakeDB.current.push({ userName, password });
      login(userName, password);
    } else {
      alert("User already taken")

    }
  }

  const checkDB = (userName: string, password: string): boolean => {
    let canLogin = false;

    fakeDB.current.forEach(user => {
      if (user.userName === userName && user.password === password) {
        canLogin = true
      }
    });

    return canLogin;
  }

  return ({
    currentUser,
    emailInputRef,
    passwordInputRef,
    setCurrentUser,
    register,
    login
  })
}