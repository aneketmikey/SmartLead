import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config(); //to enable the .env file

const {
  DB_HOST,
  DB_PORT,
  SQL_DATABASE,
  SQL_DATABASE_USERNAME,
  SQL_DATABASE_PASSWORD,
  DB_DIALECT
} = process.env;
//sequelize config object for connecting to DB
const sequelize = new Sequelize(
  SQL_DATABASE,
  SQL_DATABASE_USERNAME,
  SQL_DATABASE_PASSWORD,
  {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
  }
);
//helper method to connect to DB
export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Postgres Database is Connected");
  } catch (error) {
    console.log(
      "Error while establishing connection with Postgres Database " + error
    );
  }
};

export default sequelize;
