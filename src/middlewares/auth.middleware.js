import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  // 1. Récupérer le header Authorization (format: "Bearer <token>")
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2. Vérifier le token avec la clé secrète commune
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Injecter les infos de l'utilisateur dans la requête pour usage futur
    req.user = decoded; 
    
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token invalide ou expiré.' });
  }
};