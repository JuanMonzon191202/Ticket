import { Roles } from "../models/Roles.js";

export const getRol = async (req, res) => {
  try {
    const roles = await Roles.findAll();
    res.json(roles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createRol = async (req, res) => {
  const { rol } = req.body;

  try {
    if (!rol) {
      res.status(400).json({
        message: "Complete este campo",
      });
    }

    const newRol = await Roles.create({
      rol,
    });
    res.status(201).json({
      message: "Se creó el rol correctamente",
      data: newRol,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateRol = async (req, res) => {
  const { id } = req.params;
  const { rol } = req.body;

  try {
    const existingRol = await Roles.findByPk(id);

    if (!existingRol) {
      return res.status(400).json({
        message: "El rol no fue encontrado",
      });
    }

    if (!rol) {
      return res.status(400).json({
        message: "El nombre no puede estar vacio",
      });
    }

    existingRol.rol = rol || existingRol.rol;

    await existingRol.save();

    res.json({
      message: "Actualizacion de rol correctamente",
      data: existingRol,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
