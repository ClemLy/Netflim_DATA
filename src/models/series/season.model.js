import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';

export const Season = sequelize.define('Season', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  number: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.TEXT }
}, { tableName: 'seasons' });