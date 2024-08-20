import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { removeFromCart,addToCart,getCart,} from "../controllers/cartController.js";
const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware, addToCart);
cartRouter.post("/remove",authMiddleware, removeFromCart);
cartRouter.get("/get",authMiddleware, getCart);

export default cartRouter;
