export const errorHandler = (err, req, res, next) => {
  // Si c'est une erreur de validation Joi
  if (err.isJoi) {
    return res.status(400).json({
      message: "Erreur de validation",
      details: err.details.map(d => d.message)
    });
  }

  // Erreurs MySQL / Sequelize (ex: contrainte de clé étrangère)
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({ message: "Référence (ID) inexistante dans une autre table." });
  }

  // Autres erreurs
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || "Erreur interne du serveur",
  });
};