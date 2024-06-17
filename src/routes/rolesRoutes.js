import { Router } from "express";

import { getRol, createRol, updateRol } from "../controllers/rolController.js";

const router = Router();

router.get("/roles", getRol);

router.post("/new_role", createRol);

router.put("/edit_roles/:id", updateRol);

router.delete("/delete_roles/:id");

router.get("/role/:id");

export default router;
