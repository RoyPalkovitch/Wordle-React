import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import { HomePage } from './pages/HomePage'
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
      }
    ]
  }
])