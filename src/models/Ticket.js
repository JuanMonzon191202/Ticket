import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Usuario } from "./Usuario.js";
import { Dispositivo } from "./Dispositivo.js";

export const Ticket = sequelize.define("ticket", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Abierto", "En proceso", "Cerrado"),
    defaultValue: "Abierto",
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: "id",
    },
  },
  idDispositivo: {
    type: DataTypes.INTEGER,
    references: {
      model: Dispositivo,
      key: "id",
    },
  },
});

Ticket.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  targetKey: "id",
});

Usuario.hasMany(Ticket, {
  foreignKey: "idUsuario",
  sourceKey: "id",
});

Ticket.belongsTo(Dispositivo, {
  foreignKey: "idDispositivo",
  targetKey: "id",
});

Dispositivo.hasMany(Ticket, {
  foreignKey: "idDispositivo",
  sourceKey: "id",
});
