import { Usuario } from "../models/Usuario.js";
import { Roles } from "../models/Roles.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res
      .status(400)
      .json({ message: "Usuario y contraseña son requeridos." });
  }

  try {
    // Verificar si el usuario existe
    const existingUsuario = await Usuario.findOne({ where: { usuario } });
    if (!existingUsuario) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, existingUsuario.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    // Obtener el nombre del rol
    const rol = await Roles.findOne({ where: { id: existingUsuario.idrol } });
    if (!rol) {
      return res.status(500).json({ message: "Rol no encontrado." });
    }

    // Generar el token JWT con el nombre del rol
    const token = jwt.sign(
      {
        id: existingUsuario.id,
        usuario: existingUsuario.usuario,
        rol: rol.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
