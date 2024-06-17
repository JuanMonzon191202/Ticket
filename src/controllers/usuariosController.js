import { Usuario } from "../models/Usuario.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

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

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10); //si hay contraseñas repetidas en la db esta funcion hace que sean unicas
    const hashedPassword = await bcrypt.hash(password, salt);

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

export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { idrol, nombre, apellidos, password, usuario } = req.body;
  const { rol: userRole } = req.user; // Obtener el rol del usuario autenticado

  try {
    const existingUsuario = await Usuario.findByPk(id);

    if (!existingUsuario) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    if (password && password.length < 8) {
      return res.status(400).json({
        message: "La contraseña debe tener al menos 8 caracteres.",
      });
    }

    // Actualizar campos generales

    existingUsuario.nombre = nombre || existingUsuario.nombre;
    existingUsuario.apellidos = apellidos || existingUsuario.apellidos;

    // Si el usuario es admin, permitir la actualización del nombre de usuario
    if (userRole === "Admin") {
      if (usuario && usuario !== existingUsuario.usuario) {
        const existingUsername = await Usuario.findOne({
          where: { usuario },
        });

        if (existingUsername) {
          return res
            .status(409)
            .json({ message: "El nombre de usuario ya existe." });
        }
        existingUsuario.idrol = idrol || existingUsuario.idrol;
        existingUsuario.usuario = usuario;
      }
    }

    // Encriptar nueva contraseña si es proporcionada
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      existingUsuario.password = hashedPassword;
    }

    // Guardar cambios
    await existingUsuario.save();

    res.json({
      message: "Usuario actualizado correctamente",
      data: existingUsuario,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
