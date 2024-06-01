import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Usuario } from "./Usuario.js";
import { Dispositivo } from "./Dispositivo.js";

export const Ticket = sequelize.define("ticket", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncremental: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Abierto", "En proceso", "Cerrado"),
    defaultValue: "Abierto",
  },
});

Ticket.hasMany(Usuario, {
  foreingKey: "idTicket",
  sourceKey: "id",
});

Usuario.belongsTo(Ticket, {
  foreingKey: "idTicket",
  targetId: "id",
});

Ticket.hasMany(Dispositivo, {
  foreingKey: "idDispositivo",
  sourceKey: "id",
});

Dispositivo.belongsTo(Ticket, {
  foreingKey: "idTicket",
  targetId: "id",
});
