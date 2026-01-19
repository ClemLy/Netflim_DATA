import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';

export const Episode = sequelize.define('Episode', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  number: { type: DataTypes.INTEGER, allowNull: false },
  duration: { type: DataTypes.INTEGER },
  video_id: { type: DataTypes.UUID }
}, { tableName: 'episodes' });