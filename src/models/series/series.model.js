import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';

export const Series = sequelize.define('Series', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  poster_id: { type: DataTypes.UUID }
}, { tableName: 'series' });