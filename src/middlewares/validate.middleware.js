import Joi from 'joi';

/**
 * Middleware de validation Joi pour les routes.
 * Il remplace le corps de la requête (ou autre source) par la valeur validée et nettoyée.
 */
export const validate = (schema, { source = 'body' } = {}) => {
  return async (req, res, next) => {
    try {
      // 1. Récupération des données à valider (body, query, params)
      const payload = req?.[source] ?? {};

      // 2. Validation asynchrone des données
      const value = await schema.validateAsync(payload, {
        abortEarly: false,
        stripUnknown: true,
        convert: true,
      });

      // 3. Remplacement des données originales par les données validées et nettoyées
      req[source] = value;
      return next();
    }
	catch (err) {
      return next(err);
    }
  };
};