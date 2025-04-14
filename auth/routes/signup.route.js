import express from "express";
// controllers
import roleVer from "../middlewares/roleVerf.middleware.js";
import dataVerf from "../middlewares/dataVerf.middleware.js"
import { signup } from "../controllers/auth.controller.js";
// router
const router = express.Router();
router.post("/signup/:role", roleVer, dataVerf, signup);
export default router;
