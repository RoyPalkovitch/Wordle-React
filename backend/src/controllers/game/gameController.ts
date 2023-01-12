import { GameService } from "../../services/gameService";
import { Request, Response } from "express";

export type gameTileType = {
  classState: string,
  letter: string
}

export interface IboardData {
  currentFocusedRow: gameTileType[],
  currentWord: string
  keyBoardGrid: gameTileType[][];
}

export class GameController {
  private gameService: GameService;

  constructor() {
    this.gameService = new GameService();
  }

  async get(req: Request, res: Response) {
    const word = await this.gameService.getWord();
    res.send(word);
  }

  put(res: Response, data: IboardData) {

    const result = this.gameService.searchCorrectWords(data.currentFocusedRow, data.currentWord, data.keyBoardGrid);
    if (!result) {
      res.sendStatus(400);
    }
    res.status(200).send(JSON.stringify(result));
  };
}