import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import authRoutes from "./routes/auth.routes.js"

dotenv.config();

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
