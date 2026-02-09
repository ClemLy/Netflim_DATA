import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Middlewares d'erreur
import { errorHandler } from './middlewares/error.middleware.js';
import { notFound } from './middlewares/not-found.middleware.js';

// Routes
import categoryRoutes from './routes/category.routes.js';
import movieRoutes from './routes/movie.routes.js';
import seriesRoutes from './routes/series.routes.js';
import fileRoutes from './routes/file.routes.js';

// Swagger
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middlewares de base
app.use(helmet());
app.use(cors());
app.use(express.json());

// Configuration Swagger
const swaggerDocument = YAML.load(join(__dirname, './docs/swagger.yaml'));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Netflim DATA API',
  swaggerOptions: {
    deepLinking: true,
	persistAuthorization: true,
  }
}));

// Route pour obtenir la spec Swagger en JSON
app.get('/api/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocument);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Netflim DATA', version: '1.0.0' });
});

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/series', seriesRoutes);
app.use('/api/files', fileRoutes);

// Gestion des erreurs
app.use(notFound);
app.use(errorHandler);

export default app;