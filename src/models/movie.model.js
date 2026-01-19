import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  releaseDate: {
    type: DataTypes.DATEONLY,
  },
  duration: {
    type: DataTypes.INTEGER, // en minutes
  },
  // IDs provenant du service FILE
  poster_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  video_id: {
    type: DataTypes.UUID,
    allowNull: true,
  }
}, {
  tableName: 'movies',
  timestamps: true,
});