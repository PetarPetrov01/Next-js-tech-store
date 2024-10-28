import { Router } from "express";
import brandController from "../controllers/brand.controller";

const brandsRouter = Router();

brandsRouter.get("/", brandController.getBrands);
brandsRouter.get("/sorted", brandController.getSortedBrands);

export default brandsRouter;
