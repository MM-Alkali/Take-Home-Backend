import { Model, DataTypes, Sequelize } from "sequelize";
import db from "../config/database";

export interface UserInfo {
  id: any;
  name?: string;
  email?: string;
  password?: string;
  companyName?: string;
  numOfUsers?: string;
  numOfProducts?: string;
}

export class User extends Model<UserInfo> {
  id!: any;
  name!: string;
  email!: string;
  password!: string;
  companyName!: string;
  numOfUsers!: string;
  numOfProducts!: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
    },
    numOfUsers: {
      type: DataTypes.STRING,
    },
    numOfProducts: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "users",
    timestamps: true,
  }
);
