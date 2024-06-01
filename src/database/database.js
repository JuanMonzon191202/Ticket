import Sequelize from "sequelize";

export const sequelize = new Sequelize("tickets", "postgres", "jukilopo", {
  host: "localhost",
  dialect: "postgres",
});


