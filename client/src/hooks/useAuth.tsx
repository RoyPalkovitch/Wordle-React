import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authType } from "./types/authType";



export function useAuth(): authType {
  const [currentUser, setCurrentUser] = useState({ userName: '' });
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
    const user = { userName, password };
    window.localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser({ ...currentUser, userName: user.userName });
    navigate('/');
  }


  const logOut = () => {
    window.localStorage.removeItem('user');
    setCurrentUser({ ...currentUser, userName: '' });
  }


  return ({
    currentUser,
    emailInputRef,
    passwordInputRef,
    setCurrentUser,
    login,
    logOut
  })
}