import { Router } from "express";
import { joyasController } from "../controllers/joyas.controller.js";

const router = Router();

router.get("/", joyasController.read);

export default router;
