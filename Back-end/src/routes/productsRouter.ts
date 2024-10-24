import { Router } from "express";
import productController from "../controllers/product.controller";
import uploadController from "../controllers/upload.controller";
import multerUpload from "../middlewares/multerUpload";
import { checkProductId } from "../middlewares/validations/validate-and-load-product";
import { isUser } from "../middlewares/guards";

const productsRouter = Router();

productsRouter.get("/", productController.getProducts);
productsRouter.get("/categories", productController.getCategories);
productsRouter.get("/brands", productController.getBrands);
productsRouter.get("/:id", productController.getProductById);

productsRouter.post("/upload", isUser(), productController.uploadProduct);
productsRouter.post(
  "/:id/images",
  isUser(),
  checkProductId,
  multerUpload.productImages,
  uploadController.uploadProductImages
);

export default productsRouter;
