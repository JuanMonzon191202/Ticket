import { Router } from "express";
const router = Router();

router.get("/usuarios");

router.post("/usuarios");

router.put("/usuarios/:id");

router.delete("/usuarios/:id");

router.get("/usuarios/:id");

export default router;
