import { Router, Request, Response } from "express";
import { getWord, searchCorrectWords, gameTileType } from "./gameLogic";
import bodyParser from 'body-parser';

export const gameRouter = Router();
interface IboardData {
  currentFocusedRow: gameTileType[],
  currentWord: string
  keyBoardGrid: gameTileType[][];
}


gameRouter.get('/', async (req: Request, res: Response) => {
  const reqWord = await getWord();
  res.send(reqWord);
});

gameRouter.put('/searchcorrectwords', bodyParser.json(), (req: Request, res: Response) => {
  const data: IboardData = req.body;

  const result = searchCorrectWords(data.currentFocusedRow, data.currentWord, data.keyBoardGrid);
  if (!result) {
    res.sendStatus(400);
  }
  return res.status(200).send(JSON.stringify(result));
});



