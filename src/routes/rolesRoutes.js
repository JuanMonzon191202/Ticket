import { Router } from "express";

import { getRol, createRol } from "../controllers/rolController.js";

const router = Router();

router.get("/roles", getRol);

router.post("/roles", createRol);

router.put("/roles/:id");

router.delete("/roles/:id");

router.get("/roles/:id");

export default router;
