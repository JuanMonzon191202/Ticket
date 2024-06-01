import app from "./app.js";
import { sequelize } from "./database/database.js";
import "./models/Usuario.js";
import "./models/Ticket.js";
import "./models/Roles.js";
import "./models/Dispositivo.js";

async function main() {
  try {
    await sequelize.sync({});
    app.listen(3000);
    console.log("chambeando....");
  } catch (error) {
    console.error;
  }
}
main();
