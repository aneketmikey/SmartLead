import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import { Email } from "./Email.js"
  ;
//User Model for table definition
export const User = sequelize.define(
  "User",
  {
    User_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    User_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    SMTP_Host: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SMTP_Port: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    SMTP_Encryption: {
      type: DataTypes.ENUM("TLS", "SSL", "NONE"),
      defaultValue: "SSL",
    },

    Message_Per_Day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Minimum_Time_Gap: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    IMAP_Host: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IMAP_Port: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    IMAP_Encryption: {
      type: DataTypes.ENUM("TLS", "SSL", "NONE"),
      defaultValue: "SSL",
    },
  },
  {
    freezeTableName: true,
  }
);

//Foreign Key mapping as single User can send multiple mails
User.hasMany(Email, {
  foreignKey: {
    name: "User_id",
    allowNull: false,
  },
});

