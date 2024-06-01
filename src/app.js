import express from "express";
import usuariosRoutes from "./routes/usuariosRoutes.js";
const app = express();

app.use(usuariosRoutes);

export default app;
