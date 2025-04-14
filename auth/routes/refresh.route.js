import express from "express";
//controllers
import refreshToken from "../controllers/refreshToken.controller.js"
// middleware
import authguard from "../middlewares/authguard.middleware.js"
// router
const router = express.Router();
router.post("/refresh", authguard, refreshToken)
export default router