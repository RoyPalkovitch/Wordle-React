import { sign } from "./authService";

export interface User {
  email: string;
  password: string;
}

export class UserService {
  private db: Map<string, string>;

  constructor() {
    this.db = new Map<string, string>();
  }

  async byEmail(email: string): Promise<User> {
    const result = this.db.get(email);
    if (!result) {
      throw new Error('unable to find this user');
    }
    return { email, password: result };
  }

  async save({ email, password }: User) {

    if (this.db.has(email)) {
      return false;
    }
    const encrypt = await sign(password);
    this.db.set(email, password);
    return true;
  }
}

let userService: UserService;

export default function getUserService() {
  if (!userService) {
    userService = new UserService();
  }
  return userService;
}