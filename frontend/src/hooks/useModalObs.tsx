import { useState } from "react";
import { modalObsType } from "./types/modalObsType";


export function useModalObs(): modalObsType {
  const [modalObs, setModalObs] = useState(false);

  return ({ modalObs, setModalObs })
}