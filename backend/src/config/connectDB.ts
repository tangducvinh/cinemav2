import { Sequelize } from "sequelize";

const sequelize = new Sequelize("cinema", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
  } catch (e) {
    console.log("Unable to connect to the database: ", e);
  }
};

export default connectDB;
