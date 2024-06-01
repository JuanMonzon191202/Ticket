import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Dispositivo = sequelize.define("Dispositivo", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  detalles: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
