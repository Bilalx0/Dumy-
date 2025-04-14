import express from "express";
//controllers
import roleVer from "../middlewares/roleVerf.middleware.js";
import dataVerf from "../middlewares/dataVerf.middleware.js";
import { login } from "../controllers/auth.controller.js";
// router
const router = express.Router();
router.post("/login/:role", roleVer, dataVerf, login); 
export default router