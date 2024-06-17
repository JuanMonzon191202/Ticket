import { Dispositivo } from "../models/Dispositivo.js";
import { Ticket } from "../models/Ticket.js";

export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTicket = async (req, res) => {
  const { descripcion, idDispositivo } = req.body;
  const { id } = req.user;
  console.log(id); //si se obtiene

  try {
    if (!descripcion) {
      return res.status(400).json({
        message: "Detalle los problemas del dispositivo",
      });
    }
    if (!idDispositivo || !id) {
      return res.status(400).json({
        message: "problemas con los id asignados al ticket",
      });
    }

    const exisDispositivo = await Dispositivo.findByPk(idDispositivo);
    if (!exisDispositivo) {
      return res.status(404).json({ message: "Dispositivo no encontrado" });
    }

    const newTicket = await Ticket.create({
      descripcion,
      idUsuario: id,
      idDispositivo,
    });

    res.status(201).json({
      message: "Ticket creado exitosamente",
      data: newTicket,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const misTickets = async (req, res) => {
  const { id } = req.user;

  try {
    const mistickets = await Ticket.findAll({
      where: {
        idUsuario: id,
      },
    });

    res.json(mistickets);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getOneTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const elTicket = await Ticket.findAll({
      where: {
        id: id,
      },
    });
    res.json(elTicket);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { rol: userRole } = req.user;
  const { idUsuario } = req.user;

  const { idDispositivo, status, descripcion } = req.body;

  try {
    const existingTicket = await Ticket.findByPk(id);

    if (!existingTicket) {
      return res.status(400).json({
        message: "El ticket no encontrado",
      });
    }

    if (!idDispositivo || !idUsuario) {
      return res.status(400).json({
        message: "Problema con los id asignados en el ticket",
      });
    }
    existingTicket.descripcion = descripcion || existingTicket.descripcion;

    if (userRole === "Tecnico") {
      existingTicket.status = status || existingTicket.status;
    }

    await existingTicket.save();

    res.json({
      message: "Ticket actualizado correctamente",
      data: existingTicket,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
