import { createContext } from "react";
import { authType } from "../hooks/useAuth";


export const AuthContext = createContext<authType | null>(null);

