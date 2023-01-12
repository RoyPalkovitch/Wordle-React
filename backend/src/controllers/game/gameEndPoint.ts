import { Router, Request, Response } from "express";
import bodyParser from 'body-parser';
import { GameController, IboardData } from "./gameController";
export const gameRouter = Router();


const gameController = new GameController();

gameRouter.get('/', (req: Request, res: Response) => {
  gameController.get(req, res);
});

gameRouter.put('/searchcorrectwords', bodyParser.json(), (req: Request, res: Response) => {
  const data: IboardData = req.body;
  gameController.put(res, data);

});


