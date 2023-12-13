import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from "body-parser";

import sequelize from './Configuration/connection.js';

import articleRouter from './Routes/articleRoute.js';

dotenv.config();
sequelize.sync();

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/api/articleRoute", articleRouter);

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log('server is running on port 8000')
})
