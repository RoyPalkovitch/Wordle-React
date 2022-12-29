


export const getWord = (): Promise<string> => {
  return new Promise<string>(resolve => setTimeout(resolve, 10000, 'event'));
}