import { Router } from "express";
import { joyasController } from "../controllers/joyas.controller.js";

const router = Router();

router.get("/", joyasController.read);
router.get("/filtros", joyasController.readWithFilter);

export default router;
