import { Router, Request, Response } from "express";
import { getWord } from "./gameLogic";

export const gameRouter = Router();

gameRouter.get('/', async (req: Request, res: Response) => {
  const reqWord = await getWord();
  res.send(reqWord);
});

