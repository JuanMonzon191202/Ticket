import { Usuario } from "../models/Usuario.js";
import { Op } from "sequelize";
import bcryp from "bcrypt";

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUsuario = async (req, res) => {
  const { idrol, nombre, apellidos, usuario, password } = req.body;

  // Validaciones
  if (!usuario || usuario.length < 8) {
    return res.status(400).json({
      message: "El nombre de usuario debe tener al menos 8 caracteres.",
    });
  }

  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: "La contraseña debe tener al menos 8 caracteres." });
  }

  try {
    // Verificar si el usuario ya existe
    const existingUsuario = await Usuario.findOne({
      where: {
        usuario: {
          [Op.eq]: usuario,
        },
      },
    });

    if (existingUsuario) {
      return res
        .status(409)
        .json({ message: "El nombre de usuario ya existe." });
    }
    //bcryp contraseña
    const salt = await bcryp.genSalt(10); //si hay contraseñas repetidas en la db esta funcion hace que sean unicas
    const hashedPassword = await bcryp.hash(password, salt);

    // Crear nuevo usuario
    const newUsuario = await Usuario.create({
      idrol,
      nombre,
      apellidos,
      usuario,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Se creó el usuario correctamente",
      data: newUsuario,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
