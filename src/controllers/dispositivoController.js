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
  const { nombre, detalles } = req.body;

  try {
    if (!nombre || nombre.length < 3) {
      return res.status(400).json({
        message: "El dispositivo tiene que ser un minimo de 8 caracteres",
      });
    }

    if (!detalles) {
      res.status(400).json({
        menssage:
          "Complete la descripcion del dispositivo, ubicacion, modelo, etc.",
      });
    }
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

export const updateDispositivo = async (req, res) => {
  const { id } = req.params;
  const { nombre, detalles } = req.body;

  try {
    const existingDispositivo = await Dispositivo.findByPk(id);

    if (!existingDispositivo) {
      return res.status(400).json({
        message: "El dispositivo no fue encontrado",
      });
    }

    if (!nombre) {
      return res.status(400).json({
        message: "El nombre no puede estar vacio",
      });
    }

    if (!detalles) {
      return res.status(400).json({
        message:
          "Favor de Completar los datos de los detalles, ubicación, equipo, etc.",
      });
    }

    existingDispositivo.nombre = nombre || existingDispositivo.nombre;
    existingDispositivo.detalles = detalles || existingDispositivo.detalles;

    await existingDispositivo.save();

    res.json({
      message: "Dispositivo actualizado",
      data: existingDispositivo,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
