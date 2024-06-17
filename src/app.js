import express from "express";
import cors from "cors";

import usuariosRoutes from "./routes/usuariosRoutes.js";
import rolesRouter from "./routes/rolesRoutes.js";
import dispositivoRouter from "./routes/dispositivoRoutes.js";
import ticketRoutes from "./routes/ticketRaoutes.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();

// midewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/roles", rolesRouter);
app.use("/api/dispositivos", dispositivoRouter);
app.use("/api/tickets", ticketRoutes);
app.use("/api/auth", authRoutes);

export default app;
