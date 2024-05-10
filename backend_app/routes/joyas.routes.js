import { Router } from "express";
import { joyasController } from "../controllers/joyas.controller.js";
import report from "../middleware/report.js";

const router = Router();

router.get("/", report, joyasController.read);
router.get("/filtros", report, joyasController.readWithFilter);

router.get("*", (_, res) => {
  res.status(404).send({ message: "ruta no encontrada" });
});

export default router;
