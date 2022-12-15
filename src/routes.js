import { createBrowserRouter } from "react-router-dom";

import { Home } from './pages/Home'
import App from "./App";
import React from "react";
import { GamePage } from "./pages/GamePage";
import { SignIn } from "./pages/SignIn";
import { Register } from "./pages/Register";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/game',
        element: <GamePage />
      },
      {
        path: '/sign-in',
        element: <SignIn />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  }
])