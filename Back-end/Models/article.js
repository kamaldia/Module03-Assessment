import sequelize from "../Configuration/connection.js";
import { DataTypes } from "sequelize";
import User from './user.js'

const Article = sequelize.define('Article', {
  image_url: {type: DataTypes.STRING, allowNull: true}, //made it true for then upload, will make it required in controller

  title: {type: DataTypes.STRING, allowNull: false},

  category: {type: DataTypes.STRING, allowNull: false},

  body: {type: DataTypes.STRING, allowNull: false},

  author: {type: DataTypes.STRING, allowNull: false}
});

User.hasMany(Article);
Article.belongsTo(User);

Article.sync();
export default Article;