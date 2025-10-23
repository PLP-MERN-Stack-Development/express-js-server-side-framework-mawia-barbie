import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getStats
} from "../controllers/productController.js";
import validateProduct from "../middleware/validateProduct.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/search", searchProducts);
router.get("/stats", getStats);
router.get("/:id", getProductById);
router.post("/", validateProduct, createProduct);
router.put("/:id", validateProduct, updateProduct);
router.delete("/:id", deleteProduct);

export default router;
