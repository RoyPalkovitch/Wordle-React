import { IboardData, gameTileType } from "../controllers/game/gameController";
export class GameService {

  private wordsMap: Map<string, string>
  constructor() {
    this.wordsMap = new Map<string, string>();
    this.wordsMap.set('0', 'event');
    this.wordsMap.set('1', 'apple');
    this.wordsMap.set('2', 'watch');
  }

  getWord(): Promise<string> {
    return new Promise<string>(resolve => setTimeout(resolve, 1000, Math.floor(Math.random() * this.wordsMap.size)).toString());
  }

  searchCorrectWords({ rowData, currentWord, keyboard }: IboardData): IboardData | boolean {
    if (!this.wordsMap.has(currentWord)) return false;
    const word = this.wordsMap.get(currentWord).toUpperCase();
    const charCount: { [word: string]: number } = this.countCharsInWord(word);
    const letters: string = "qwertyuiopasdfghjklzxcvbnm".toUpperCase();
    //marking the correct ones
    for (let index = 0; index < rowData.length; index++) {//checking each column in row
      const letter = rowData[index].letter;
      if (!letters.includes(letter)) {
        return false;
      }

      if (charCount[letter] === 0 || word[index] !== letter) {
        continue;
      }

      const keyboardTile = this.getKeyboardTile(letter, keyboard);
      if (!keyboardTile) {
        return false;
      }

      //if letter correct
      charCount[letter] -= 1;
      rowData[index].classState = 'correct';
      if (charCount[letter] === 0) {
        keyboardTile.classState = 'keyboard-tile correct';
      }

    }


    for (let index = 0; index < rowData.length; index++) {
      //mark keyboard if letter exist but not in the current place
      const letter = rowData[index].letter;
      if (!letters.includes(letter)) {
        return false;
      }

      const keyboardTile = this.getKeyboardTile(letter, keyboard);
      if (!keyboardTile) {
        return false;
      }


      //letter is not in the word
      if (!word.includes(letter) || (charCount[letter] === 0 && rowData[index].classState !== 'correct')) {
        rowData[index].classState = 'wrong';
        if (keyboardTile.classState === 'keyboard-tile') {
          keyboardTile.classState = 'keyboard-tile wrong';
        }
        continue;
      }

      if (letter !== word[index]) {
        charCount[letter] -= 1;
        if (!keyboardTile.classState.includes('correct'))
          keyboardTile.classState = 'keyboard-tile exist';
        rowData[index].classState = 'exist';//exist in the given word
      }
    }

    const win = this.checkWin(rowData, word);
    return { rowData, keyboard, win };
  }

  private countCharsInWord(word: string): { [word: string]: number } {
    const count: { [word: string]: number } = {};
    for (let i = 0; i < word.length; i++) {
      if (count[word[i]])
        count[word[i]] += 1;
      else {
        count[word[i]] = 1;
      }
    }
    return count;
  }

  private getKeyboardTile(letter: string, keyboard: gameTileType[][]): gameTileType {

    for (let i = 0; i < keyboard.length; i++) {
      for (let j = 0; j < keyboard[i].length; j++) {
        if (letter === keyboard[i][j].letter) {

          return keyboard[i][j];
        }
      }
    }
    return { classState: '', letter: "" }
  }

  //check if all the word are correct and in order
  private checkWin(rowData: gameTileType[], word: string): boolean {
    const win = rowData.map(col => (col.letter)).join('');
    if (win === word) {
      return true;
    }
    return false;
  }

}