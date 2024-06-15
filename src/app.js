import express from "express";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import rolesRouter from "./routes/rolesRoutes.js";
import dispositivoRouter from "./routes/dispositivoRoutes.js";
import ticketRoutes from "./routes/ticketRaoutes.js";
const app = express();

// midewares
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/", usuariosRoutes);
app.use("/api/", rolesRouter);
app.use("/api/", dispositivoRouter);
app.use("/api/", ticketRoutes);

export default app;
