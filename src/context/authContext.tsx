import { createContext } from "react";
import { TAuth } from "../hooks/useAuth";


export const AuthContext = createContext<TAuth | null>(null);

