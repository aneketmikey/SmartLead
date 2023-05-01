import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

//Email Model for table definition
export const Email = sequelize.define(
  "Email",
  {
    Email_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    Email_to: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    CC: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    BCC: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    Subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Status: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

