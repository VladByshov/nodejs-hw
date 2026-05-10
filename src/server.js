import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export const setupServer = () => {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(pino(
        {
            level: 'info',
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    translateTime: 'HH:MM:ss',
                    ignore: 'pid,hostname',
                    messageFormat:
                        '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
                    hideObject: true,
                },
            },
        }
    ));

    // Routes
    app.get('/notes', (req, res) => {
        res.status(200).json({
            message: 'Retrieved all notes',
        });
    });

    app.get('/notes/:noteId', (req, res) => {
        const {noteId} = req.params;
        res.status(200).json({
            message: `Retrieved note with ID: ${noteId}`,
        });
    });

    app.get('/test-error', () => {
        throw new Error('Simulated server error');
    });

    // 404 Middleware (має бути після маршрутів)
    app.use((req, res) => {
        res.status(404).json({
            message: 'Route not found',
        });
    });

    // 500 Middleware (має бути останнім)
    app.use((err, req, res, next) => {
        res.status(500).json({
            message: err.message || 'Internal Server Error',
        });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

setupServer();