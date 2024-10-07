import { Router } from "express";
import wishlistController from "../controllers/wishlist.controller";

const wishListRouter = Router();

wishListRouter.post("/add", wishlistController.addToWishList);
wishListRouter.post("/remove", wishlistController.removeFromWishList);

export default wishListRouter;
