import { createContext } from "react";
import { gameConfigType } from "../hooks/useGameConfig";

export const gameConfigContext = createContext<gameConfigType | null>(null);