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
  const { descripcion, idUsuario, idDispositivo } = req.body;

  try {
    const newTicket = await Ticket.create({
      descripcion,
      idUsuario,
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
