import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const File = sequelize.define('File', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false // Le chemin fourni par le File Service
  },
  type: {
    type: DataTypes.ENUM('VIDEO', 'IMAGE'),
    allowNull: false
  },
  ownerId: {
    type: DataTypes.STRING, // ID de l'utilisateur fourni par le JWT lors de l'upload
    allowNull: true
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'categories',
      key: 'id'
    }
  }
});