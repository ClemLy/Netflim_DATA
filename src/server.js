import app from './app.js';
import { sequelize } from './config/database.js';

import { Category, Movie } from './models/index.js';

const PORT = process.env.PORT;

async function start() {
  try {
    // Test de la connexion DB
    await sequelize.authenticate();
    console.log('✅ Connexion MySQL établie.');

    // Synchronisation des modèles
    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`🚀 Service DATA lancé sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Impossible de démarrer le serveur:', error);
    process.exit(1);
  }
}

start();