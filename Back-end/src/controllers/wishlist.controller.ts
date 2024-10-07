import { Response } from "express";
import { CustomRequest } from "../middlewares/sesssion";
import wishListService from "../services/wishListService";

async function addToWishList(req: CustomRequest, res: Response) {
  try {
    const { productId } = req.body;

    if (!req.user?._id) {
      return res.status(403).send({ message: "You are not logged in" });
    }

    const wishlist = await wishListService.addToWishList(
      req.user?._id,
      productId
    );
    res.json(wishlist);
  } catch (error: any) {
    res.status(400).send({
      message: "File upload failed.",
      error: error.message,
    });
  }
}

