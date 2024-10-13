import { Router } from "express";
import productController from "../controllers/product.controller";
import uploadController from "../controllers/upload.controller";
import multerUpload from "../middlewares/multerUpload";
import { checkProductId } from "../middlewares/validations/upload-images";

const productsRouter = Router();

productsRouter.get("/", productController.getProducts);
productsRouter.get("/categories", productController.getCategories);
productsRouter.get("/brands", productController.getBrands);
productsRouter.get("/:id", productController.getProductById);

productsRouter.post("/upload", productController.uploadProduct);
productsRouter.post(
  "/:id/images",
  checkProductId,
  multerUpload.productImages,
  uploadController.uploadProductImages
);

export default productsRouter;
