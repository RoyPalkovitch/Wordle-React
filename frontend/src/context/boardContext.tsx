import { createContext } from "react";
import { boardType } from "../hooks/types/boardType";

export const boardContext = createContext<boardType | null>(null);