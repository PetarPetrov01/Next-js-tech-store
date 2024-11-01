import jwt, { JwtPayload, Secret, TokenExpiredError } from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "1qsc2wdv3efv";
const TOKEN_EXPIRATION_TIME = 60 * 30;

export interface UserPayload extends JwtPayload {
  _id: string;
  email: string;
}

interface CustomJWT {
  payload: UserPayload | null;
  expired?: boolean;
}

export async function signJWT(payload: UserPayload): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      { expiresIn: TOKEN_EXPIRATION_TIME, algorithm: "HS256" },
      (err, encoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(encoded as string);
        }
      }
    );
  });
}

function verifyToken(verifyKey: Secret) {
  return (token: string): CustomJWT => {
    try {
      const verified = jwt.verify(token, verifyKey) as UserPayload;

      return { payload: verified, expired: false };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return { payload: null, expired: true };
      }

      return { payload: null };
    }
  };
}

export const verifyJWT = verifyToken(secret);
