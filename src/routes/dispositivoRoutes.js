import { Router } from "express";

import {
  getDispositivo,
  createDispositivo,
} from "../controllers/dispositivoController.js";

const router = Router();

router.get("/dispositivo", getDispositivo);

router.post("/dispositivo", createDispositivo);

router.put("/dispositivo/:id");

router.delete("/dispositivo/:id");

router.get("/dispositivo/:id");

export default router;
