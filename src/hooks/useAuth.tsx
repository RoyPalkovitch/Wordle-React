import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";




export type TAuth = {
  currentUser: { name: string },
  setCurrentUser: React.Dispatch<React.SetStateAction<{ name: string; }>>,
  login: (userName: string, password: string) => void,
  register: (userName: string, password: string) => void
}


export function useAuth(): TAuth {
  const [currentUser, setCurrentUser] = useState({ name: '' });
  const fakeDB = useRef([{ userName: '', password: '' }]);
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
    setCurrentUser,
    register,
    login
  })
}