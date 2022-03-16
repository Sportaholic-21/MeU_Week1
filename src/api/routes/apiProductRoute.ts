import express from "express";
import { createProduct, deleteProduct, getProduct, getProductCount, getProductListing, updateProduct } from "../controllers/productCtrl"
const router = express.Router();

router.route("/")
    .get(getProductListing)
    .post(createProduct)


router.get("/count", getProductCount)

router.route("/:code")
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct)


export { router as productRouter }