import { Request, Response } from "express";
import { signup, login } from "../../auth/login-signup";
import { UserService } from "../../services/userService";
import { createJWT } from "../../services/authService";

export class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async signup(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      if (await signup({ email, password })) {
        res.send({ token: createJWT({ email }) });
      }
    } catch (e) {
      res.send({ token: null });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      if (await login({ email, password })) {
        res.send({ token: createJWT({ email }) });
      }
    } catch (e) {
      res.send({ token: null });
    }
  }


}