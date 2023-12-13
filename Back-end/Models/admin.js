import sequelize from "../Configuration/connection.js";
import { DataTypes } from "sequelize";

const Admin = sequelize.define('Admin', {
  user_name: {type: DataTypes.STRING, allowNull: false, unique: true},
});

Admin.sync();
export default Admin;