import express from 'express';
import dotenv from 'dotenv';
import pg from 'pg';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';


dotenv.config();

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

try {
    db.connect();
    console.log('Connected to PostgreSQL database on port ' + process.env.DB_PORT);
  } catch (err) {
    console.error(err);
  }

const app = express();
const PORT = process.env.PORT;
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(helmet());

app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`)
})
