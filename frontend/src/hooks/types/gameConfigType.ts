export type gameConfigType = {
  lengthOfWord: React.RefObject<number>,
  numberOfTries: React.RefObject<number>,
  propChanged: boolean,
  changeConfig: (wordLengthRef: number, numberOfTriesRef: number) => void;
}