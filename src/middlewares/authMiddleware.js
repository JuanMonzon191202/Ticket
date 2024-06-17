import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. No hay token proporcionado." });
  }

  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. Token malformado." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token no válido" });
  }
};
export const authorizeRole = (roles) => {
  return (req, res, next) => {
    const { rol } = req.user;

    if (!roles.includes(rol)) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para acceder a este recurso" });
    }
    next();
  };
};
