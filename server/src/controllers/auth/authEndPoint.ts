import { Router, Request, Response } from "express";
import bodyParser from 'body-parser';
import { AuthController } from "./authController";

export const authEndPoint = Router();

const authController = new AuthController();

authEndPoint.post('/signup', bodyParser.json(), async (req: Request, res: Response) => {
  authController.signup(req, res);
});

authEndPoint.post('/login', bodyParser.json(), async (req: Request, res: Response) => {
  authController.login(req, res);
});


