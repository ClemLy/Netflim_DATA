import { File } from '../models/file.model.js';

export const fileRepository = {
  async create(data) {
    return await File.create(data);
  },
  async findById(id) {
    return await File.findByPk(id);
  },
  async delete(id) {
    return await File.destroy({ where: { id } });
  }
};