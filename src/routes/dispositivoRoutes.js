import { Router } from "express";

import {
  getDispositivo,
  createDispositivo,
  updateDispositivo,
} from "../controllers/dispositivoController.js";

const router = Router();

router.get("/dispositivos", getDispositivo);

router.post("/new_dispositivo", createDispositivo);

router.put("/edit_dispositivo/:id", updateDispositivo);

router.delete("/delete_dispositivo/:id");

router.get("/dispositivo/:id");

export default router;
