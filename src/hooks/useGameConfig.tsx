import { useRef } from "react";

export type gameConfigType = {
  lengthOfWord: React.RefObject<HTMLInputElement>,
  numberOfTries: React.RefObject<HTMLInputElement>
}

export function useGameConfig(): gameConfigType {
  const lengthOfWord = useRef<HTMLInputElement>(null);
  const numberOfTries = useRef<HTMLInputElement>(null);

  return ({
    lengthOfWord,
    numberOfTries
  })
}