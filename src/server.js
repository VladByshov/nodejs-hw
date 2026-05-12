import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import { connectMongoDB } from './db/connectMongoDB.js';

dotenv.config();

const setupServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    // 1. Підключення до БД
    await connectMongoDB();

    // 2. Middlewares
    app.use(logger);
    app.use(cors());
    app.use(express.json());

    // 3. Маршрути
    app.use(notesRoutes);

    // 4. Обробка помилок (завжди в кінці)
    app.use(notFoundHandler);
    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
};

setupServer();