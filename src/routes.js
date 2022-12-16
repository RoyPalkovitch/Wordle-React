import React from "react";
import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import { HomePage } from './pages/HomePage'
import { RegisterPage } from "./pages/RegisterPage";
import { SignInPage } from "./pages/SignInPage";
import { GamePage } from "./pages/GamePage";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/game',
        element: <GamePage />
      },
      {
        path: '/sign-in',
        element: <SignInPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      }
    ]
  }
])