import { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import { GameController } from "./gameController";



export const gameEndPoint = Router();
const gameController = new GameController();

gameEndPoint.get("/", (req: Request, res: Response) => {
  gameController.get(req, res);
});

gameEndPoint.put("/searchcorrectwords", bodyParser.json(), (req: Request, res: Response) => {
  gameController.put(req, res);
});


