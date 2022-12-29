


export const getWord = (): Promise<string> => {
  return new Promise<string>(resolve => setTimeout(resolve, 1000, 'event'));
}