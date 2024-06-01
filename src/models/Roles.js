import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Roles = sequelize.define("Roles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
