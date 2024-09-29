import { Router } from "express";
import productController from "../controllers/product.controller";
const productsRouter = Router();

productsRouter.get("/", productController.getProducts);
productsRouter.get("/:id", productController.getProductById);
productsRouter.get("/categories", productController.getCategories);
productsRouter.get("/brands", productController.getBrands);

export default productsRouter;
