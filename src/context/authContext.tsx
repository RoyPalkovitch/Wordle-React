import { createContext } from "react";
import { IAuth } from "../hooks/useAuth";


export const AuthContext = createContext<IAuth | null>(null);

