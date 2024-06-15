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
