import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Roles } from "./Roles.js";

export const Usuario = sequelize.define("Usuario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idrol: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Usuario.belongsTo(Roles, {
  foreignKey: "idrol",
  targetKey: "id",
});
Roles.hasMany(Usuario, {
  foreignKey: "idrol",
  sourceKey: "id",
});
