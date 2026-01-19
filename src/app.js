import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Middlewares d'erreur
import { errorHandler } from './middlewares/error.middleware.js';
import { notFound } from './middlewares/not-found.middleware.js';

// Routes
import categoryRoutes from './routes/category.routes.js';
import movieRoutes from './routes/movie.routes.js';

const app = express();

// Middlewares de base
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.json({ message: "Netflim DATA Service API" }));
app.use('/api/categories', categoryRoutes);
app.use('/api/movies', movieRoutes);

// Gestion des erreurs
app.use(notFound);
app.use(errorHandler);

export default app;