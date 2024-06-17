import { Router } from "express";

import {
  getUsuarios,
  createUsuario,
  updateUsuario,
} from "../controllers/usuariosController.js";
import {
  authMiddleware,
  authorizeRole,
} from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/usuarios", authMiddleware, authorizeRole(["Admin"]), getUsuarios);

router.post("/new_usuario", createUsuario);

router.put(
  "/usuarios/:id",
  authMiddleware,
  authorizeRole(["Admin", "Tecnico", "Usuario"]),
  updateUsuario
);

router.delete("/usuarios/:id", authMiddleware, authorizeRole(["Admin"]));

router.get(
  "/usuarios/:id",
  authMiddleware,
  authorizeRole(["Admin", "Tecnico", "Usuario"])
);

export default router;
