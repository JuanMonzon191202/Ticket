import { Dispositivo } from "../models/Dispositivo.js";

export const getDispositivo = async (req, res) => {
  try {
    const dispositivo = await Dispositivo.findAll();

    res.json(dispositivo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createDispositivo = async (req, res) => {
  const { nombre, detalles } = res.body;

  try {
    const newDispositivo = await Dispositivo.create({
      nombre,
      detalles,
    });

    res.status(201).json({
      message: "Se creó el nuevo dispositivo",
      data: newDispositivo,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
