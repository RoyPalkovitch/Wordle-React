import { GameService } from "../../services/gameService";
import { Request, Response } from "express";

export type gameTileType = {
  classState: string,
  letter: string
}

export interface IboardData {
  rowData: gameTileType[],
  currentWord?: string,
  win?: boolean,
  keyboard: gameTileType[][];
}

export class GameController {
  private gameService: GameService;

  constructor() {
    this.gameService = new GameService();
  }

  async get(req: Request, res: Response) {
    const word = await this.gameService.getWord();
    res.send(word).status(200);
  }

  async put(req: Request, res: Response) {
    const data: IboardData = req.body;

    const result = this.gameService.searchCorrectWords(data);
    if (!result) {
      res.sendStatus(400);
    }
    res.status(200).send(JSON.stringify(result));
  };
}

