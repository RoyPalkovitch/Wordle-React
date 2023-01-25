import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

const MY_JWT_KEY = 'shhhh2donSt!tell$rnFybody';

export function createJWT(data: object): string {
  return jwt.sign(data, MY_JWT_KEY);
}

export function verifyJWT<T = JwtPayload>(token: string): T {
  return jwt.verify(token, MY_JWT_KEY) as T;
}

export function sign(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function verify(encrypted: string, password: string): Promise<boolean> {
  return bcrypt.compare(password, encrypted);
}