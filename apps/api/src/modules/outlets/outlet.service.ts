import prisma from '../../shared/config/prisma';
import { OutletInput } from './outlet.validator';

export class OutletService {
  async list(search?: string) {
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { contactPerson: { contains: search, mode: 'insensitive' as const } },
            { phone: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};
    return prisma.outlet.findMany({ where, orderBy: { createdAt: 'desc' } });
  }

  async getById(id: string) {
    return prisma.outlet.findUnique({ where: { id } });
  }

  async create(data: OutletInput) {
    return prisma.outlet.create({ data: data as any });
  }

  async update(id: string, data: OutletInput) {
    return prisma.outlet.update({ where: { id }, data: data as any });
  }

  async delete(id: string) {
    return prisma.outlet.delete({ where: { id } });
  }
}

export const outletService = new OutletService();
