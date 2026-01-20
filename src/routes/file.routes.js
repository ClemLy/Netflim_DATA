import { Router } from 'express';
import { fileRepository } from '../repositories/file.repository.js';

const router = Router();

// Middleware de vérification du token interne
const internalAuth = (req, res, next) => {
  const token = req.headers['x-service-token'];
  if (token && token === process.env.SERVICE_TOKEN) {
    next();
  } else {
    res.status(403).json({ message: "Accès inter-service refusé" });
  }
};

// 1. Créer un fichier (Appelé par FILE service après upload)
router.post('/', internalAuth, async (req, res) => {
  try {
    const file = await fileRepository.create(req.body);
    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Récupérer un fichier par ID (Appelé par FILE service pour stream/suppression)
router.get('/:id', internalAuth, async (req, res) => {
  const file = await fileRepository.findById(req.params.id);
  if (!file) return res.status(404).json({ message: "Fichier non trouvé" });
  res.json(file);
});

// 3. Supprimer un fichier (Uniquement l'entrée en base)
router.delete('/:id', internalAuth, async (req, res) => {
  await fileRepository.delete(req.params.id);
  res.status(204).send();
});

export default router;