export type gameConfigType = {
  lengthOfWord: React.RefObject<number>,
  numberOfTries: React.RefObject<number>,
  propChanged: boolean,
  setPropChange: React.Dispatch<React.SetStateAction<boolean>>,
  changeConfig: (wordLengthRef: number, numberOfTriesRef: number) => void;
}