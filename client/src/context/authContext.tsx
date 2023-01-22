import { createContext } from "react";
import { authType } from "../hooks/types/authType";

export const AuthContext = createContext<authType | null>(null);

