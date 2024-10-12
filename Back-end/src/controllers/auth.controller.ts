import { CookieOptions, Request, Response } from "express";

import authService from "../services/authService";
import userService from "../services/userService";

import { CustomRequest } from "../middlewares/sesssion";
import { TypedRequestBody } from "zod-express";
import { RegisterSchemaType } from "../middlewares/validations/register-request";

const cookieOptions: CookieOptions = {
  domain: "localhost",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  secure: true,
};

export const expiredCookie: CookieOptions = {
  domain: "localhost",
  path: "/",
  expires: new Date(0),
  sameSite: "none",
  secure: true,
};

async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const { authToken, user } = await authService.login(email, password);

    res.cookie("authToken", authToken, cookieOptions);

    res.status(201).json(user);
  } catch (error: any) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
}

async function register(
  req: TypedRequestBody<RegisterSchemaType>,
  res: Response
) {
  try {
    const { email, firstName, lastName, username, password } = req.body;
    const { authToken, user } = await authService.register(
      email,
      firstName,
      lastName,
      username,
      password
    );


    res.cookie("authToken", authToken, cookieOptions);

    res.status(201).json(user);
  } catch (error: any) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
}

async function validate(req: CustomRequest, res: Response) {
  try {
    if (req.user) {
      const user = await userService.getProfile(req.user._id);
      res.status(200).json(user);
    } else {
      throw new Error("Missing token");
    }
  } catch (error: any) {
    res.cookie("authToken", "", expiredCookie);
    res.status(401).json({ message: error.message });
    console.log(error.message);
  }
}

async function logout(req: CustomRequest, res: Response) {
  try {
    res.cookie("authToken", "", expiredCookie);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ message: "Logout failed" });
  }
}

async function getProfile(req: CustomRequest, res: Response) {
  try {
    console.log("Get prof req");
    if (!req.user?._id) {
      throw new Error("You must be logged in");
    }
    const data = await userService.getProfile(req?.user?._id);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}

async function updateUsername(req: CustomRequest, res: Response) {
  try {
    if (!req.user?._id) {
      throw new Error("You must be logged in");
    }
    const data = await userService.updateUsername(
      req.user._id,
      req.body.username
    );
    res.status(200).json(data);
  } catch (error: any) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
}

const authController = {
  login,
  register,
  validate,
  logout,
  getProfile,
  updateUsername,
};

export default authController;
