import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_TYPE,
  port: process.env.DB_PORT,
});

try {
  await sequelize.authenticate();
  console.log('connection has been established');
} catch (error) {
  console.error('unable to connect to db', error);
}

export default sequelize;