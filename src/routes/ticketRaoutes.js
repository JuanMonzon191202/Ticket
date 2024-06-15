import { Router } from "express";
import { createTicket, getTickets } from "../controllers/ticketsController.js";

const router = Router();

router.get("/tickets", getTickets);
router.post("/tickets", createTicket);
router.put("/tickets/:id");
router.delete("/tickets/:id");
router.get("/tickets/:id");

export default router;
