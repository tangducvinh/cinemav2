var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import { Sequelize } from "sequelize";
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "mysql",
    dialectModule: require("mysql2"),
    logging: false,
    timezone: "+07:00",
});
let connectDB = () => __awaiter(this, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log("Connection has been established successfully");
    }
    catch (e) {
        console.log("Unable to connect to the database: ", e);
    }
});
// export default connectDB;
module.exports = connectDB;
