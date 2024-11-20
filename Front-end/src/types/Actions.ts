import { RegisterSchemaType } from "@/zodSchemas/registerSchema";

export type RegisterData = Omit<RegisterSchemaType, "repassword">;

export type CookieOptions = {
  name: string;
  value: string;
  path: string;
  maxAge: number;
  domain: string;
};

export interface ReturnedImages {
  id: number;
  url: string;
  productId: string;
}
