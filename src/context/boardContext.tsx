import { createContext } from "react";
import { boardType } from "../hooks/useBoard";

export const boardContext = createContext<boardType | null>(null);