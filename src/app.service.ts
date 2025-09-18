import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }

  //search
  async searchCentersByName(name: string) {
    return this.prisma.center.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }

  // CREATE
  async createCenter(payload: any) {
    const center = await this.prisma.center.create({
      data: payload,
    });

    return {
      success: true,
      message: 'New center created',
      data: center,
    };
  }

  // READ (all)
  async getCenters() {
    return this.prisma.center.findMany();
  }

  // READ (by id)
  async getCenterById(id: number) {
    const center = await this.prisma.center.findUnique({
      where: { id },
    });

    if (!center) {
      throw new NotFoundException('Center not found');
    }

    return center;
  }

  // UPDATE
  async updateCenter(id: number, payload: any) {
    const center = await this.prisma.center.update({
      where: { id },
      data: payload,
    });

    return {
      success: true,
      message: 'Center updated',
      data: center,
    };
  }

  // DELETE
  async deleteCenter(id: number) {
    await this.prisma.center.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Center deleted',
    };
  }
}
