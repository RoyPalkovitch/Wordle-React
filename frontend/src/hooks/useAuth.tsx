import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authType } from "./types/authType";



export function useAuth(): authType {
  const [currentUser, setCurrentUser] = useState({ name: '' });
  const fakeDB = useRef([{ userName: '', password: '' }]);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, [])

  const login = (userName: string, password: string) => {
    const inLocal = window.localStorage.getItem('user');
    if (inLocal) {
      setCurrentUser(JSON.parse(inLocal));
      return;
    }
    if (checkDB(userName, password)) {
      fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(response => response.json())
        .then((user) => {
          window.localStorage.setItem('user', JSON.stringify(user));
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

  const logOut = () => {
    window.localStorage.removeItem('user');
    setCurrentUser({ name: '' });
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
    login,
    logOut
  })
}