import { Sequelize } from "sequelize";
import { sequelizeConfigProps } from "../config.js";
import { sequelizeOperationsAPI } from "./operations-api.js";

//realizare conexiune la BD
const sequelizeConnection = new Sequelize(
    "manager_travel_plans", 
    "root", 
    "Asdqwe1234", 
    sequelizeConfigProps
);

//creare tabela Travel_Plans
export const Travel_Plans = sequelizeConnection.define("Travel_Plans", {
    TravelId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    Origin: {
        type: Sequelize.STRING,
    },
    Destination: {
        type: Sequelize.STRING,
    },
});


//creare tabela User
export const Users = sequelizeConnection.define("Users", {
    UserId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    Name: {
      type: Sequelize.STRING,
    },
    Age: {
      type: Sequelize.DECIMAL(18, 2),
    },
  });


//realizare legatura One to Many intre cele 2 tabele:
Users.hasMany(Travel_Plans, {
    foreignKey: "UserId",
    onDelete: "CASCADE", //cand stergem o inreg din Users sa se stearga inregistrarile aferente din Travel_Plans
    onUpdate: "RESTRICT",
    foreignKeyConstraint: true,
  });

//autentificare in BD
sequelizeOperationsAPI.init(sequelizeConnection);

export {sequelizeConnection};