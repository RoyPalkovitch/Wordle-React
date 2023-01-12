import { useRef, useState } from "react";

export type gameConfigType = {
  lengthOfWord: React.RefObject<number>,
  numberOfTries: React.RefObject<number>,
  propChanged: boolean[],
  changeConfig: (wordLengthRef: number, numberOfTriesRef: number) => void;
}

export function useGameConfig(): gameConfigType {
  const lengthOfWord = useRef(5);
  const numberOfTries = useRef(5);
  const [propChanged, setPropChange] = useState([false]);

  function changeConfig(wordLengthRef: number, numberOfTriesRef: number) {
    lengthOfWord.current = wordLengthRef;
    numberOfTries.current = numberOfTriesRef;
    setPropChange([true]);
  }

  return ({
    lengthOfWord,
    numberOfTries,
    propChanged,
    changeConfig
  })
}