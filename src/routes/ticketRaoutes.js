import { Router } from "express";
import {
  createTicket,
  getTickets,
  updateTicket,
  misTickets,
  getOneTicket,
} from "../controllers/ticketsController.js";

import {
  authMiddleware,
  authorizeRole,
} from "../middlewares/authMiddleware.js";
const router = Router();

router.get(
  "/tickets",
  authMiddleware,
  authorizeRole(["Admin", "Tecnico"]),
  getTickets
);

router.get(
  "/mis_tickets",
  authMiddleware,
  authorizeRole(["Admin", "Tecnico", "Usuario"]),
  misTickets
);

router.post(
  "/new_ticket",
  authMiddleware,
  authorizeRole(["Admin", "Tecnico", "Usuario"]),
  createTicket
);
router.put(
  "/edi_tickets/:id",
  updateTicket,
  authMiddleware,
  authorizeRole(["Admin", "Tecnico", "Usuario"])
);

router.delete("/delete_tickets/:id");

router.get(
  "/ticket/:id",
  authMiddleware,
  authorizeRole(["Admin", "Tecnico", "Usuario"]),
  getOneTicket
);

export default router;
