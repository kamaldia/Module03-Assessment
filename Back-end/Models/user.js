import sequelize from "../Configuration/connection.js";
import { DataTypes } from "sequelize";

const User = sequelize.define('User', {
  user_name: {type: DataTypes.STRING, allowNull: false, unique: true},
});

User.sync();
export default User;