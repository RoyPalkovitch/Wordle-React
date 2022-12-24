import { createContext } from "react";
import { IAuth, User } from "../hooks/useAuth";


export const AuthContext = createContext<IAuth | null>(null);

