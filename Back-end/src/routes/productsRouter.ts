import { Router } from "express";
import productController from "../controllers/product.controller";
import uploadController from "../controllers/upload.controller";
import categoryController from "../controllers/category.controller";

import multerUpload from "../middlewares/multerUpload";
import { checkProductId } from "../middlewares/validations/validate-and-load-product";
import { isUser } from "../middlewares/guards";
import validatePostProduct from "../middlewares/validations/post-product";

const productsRouter = Router();

productsRouter.get("/", productController.getProducts);
productsRouter.get("/categories", categoryController.getCategories);
productsRouter.get("/:id", productController.getProductById);
productsRouter.get("/:id/images", isUser(), productController.getProductImages);

productsRouter.post(
  "/upload",
  isUser(),
  validatePostProduct,
  productController.uploadProduct
);
productsRouter.post(
  "/:id/images",
  isUser(),
  checkProductId,
  multerUpload.productImages,
  uploadController.uploadProductImages
);
productsRouter.put(
  "/:id/edit",
  isUser(),
  checkProductId,
  validatePostProduct,
  productController.editProduct
);
productsRouter.post("/category", categoryController.createCategory);

productsRouter.delete(
  "/:id/images",
  isUser(),
  checkProductId,
  uploadController.deleteProductImages
);

export default productsRouter;
