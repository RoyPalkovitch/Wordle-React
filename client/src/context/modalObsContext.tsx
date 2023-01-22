import { createContext } from "react";
import { modalObsType } from "../hooks/types/modalObsType";


export const ModalObsContext = createContext<modalObsType | null>(null);