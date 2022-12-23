import { createContext } from "react";
import { IBoard } from "../hooks/useBoard";

export const boardContext = createContext<IBoard | null>(null);