import jwt, { JwtPayload } from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "1qsc2wdv3efv";

export interface UserPayload extends JwtPayload {
  _id: string;
  email: string;
}

export async function signJWT(payload: UserPayload): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn: 10 }, (err, enc) => {
      if (err) {
        reject(err);
      } else {
        resolve(enc as string);
      }
    });
  });
}
