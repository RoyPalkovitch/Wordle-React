import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  const fakeDB = useRef([]);
  const navigate = useNavigate();

  const login = (userName, password) => {
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

  const register = (userName, password) => {
    if (!checkDB(userName, password)) {
      fakeDB.current.push({ userName, password });
      login(userName, password);
    } else {
      alert("User already taken")

    }
  }

  const checkDB = (userName, password) => {
    let canLogin = false;

    fakeDB.current.forEach(user => {
      if (user.userName === userName && user.password === password) {
        canLogin = true

      }
    });

    return canLogin;
  }

  return ({
    fakeDB,
    currentUser,
    setCurrentUser,
    register,
    login
  })
}