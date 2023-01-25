import { verify } from '../services/authService';
import getUserService from 'services/userService';
export interface Credentials {
  email: string;
  password: string;
}

// the user get a token contain data

export async function login({ email, password }: Credentials): Promise<boolean> {
  const user = await getUserService().byEmail(email);
  const verified = await verify(user.password, password);
  return verified;
}

export async function signup({ email, password }: Credentials): Promise<boolean> {
  return await getUserService().save({ email, password });
}