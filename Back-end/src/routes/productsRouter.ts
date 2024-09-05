import { Router } from "express";
import productController from "../controllers/product.controller";
const productsRouter = Router();

productsRouter.get("/", productController.getProducts);
productsRouter.get("/categories", productController.getCategories);

export default productsRouter;
