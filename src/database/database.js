import Sequelize from "sequelize";
import dotenv from "dotenv"; // permite majear env al proyecto

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Obtener la URL de la base de datos desde las variables de entorno
const databaseUrl = process.env.DATABASE_URL;

// Crear la instancia de Sequelize usando la URL de conexión
export const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
});
