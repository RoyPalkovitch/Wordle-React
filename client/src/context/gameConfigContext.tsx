import { createContext } from "react";
import { gameConfigType } from "../hooks/types/gameConfigType";
export const gameConfigContext = createContext<gameConfigType | null>(null);