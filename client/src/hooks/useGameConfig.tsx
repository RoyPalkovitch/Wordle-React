import { useRef, useState } from "react";
import { gameConfigType } from "./types/gameConfigType";


export function useGameConfig(): gameConfigType {
  const lengthOfWord = useRef(5);
  const numberOfTries = useRef(5);
  const [propChanged, setPropChange] = useState(false);

  function changeConfig(wordLengthRef: number, numberOfTriesRef: number) {
    lengthOfWord.current = wordLengthRef;
    numberOfTries.current = numberOfTriesRef;
    setPropChange(true);
  }

  return ({
    lengthOfWord,
    numberOfTries,
    propChanged,
    setPropChange,
    changeConfig
  })
}